function initHotKeys() {

  var bodyEl = document.body;
  var searchInput = document.getElementById('search');

  document.addEventListener('keydown', function (event) {
      if (event.defaultPrevented) {
          return;
      }

      var key = event.key || event.keyCode;

      // ESC to close search window
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        document.body.classList.remove('has-active-search-window');
      }

      // / to close toggle window
      if (key === '/' || key === 'Period' || key === 58) {
        event.preventDefault();
        document.body.classList.toggle('has-active-search-window');
        if (bodyEl.classList.contains('has-active-search-window')) {
          searchInput.focus();
        }
      }

      //when search is active TAB puts search input into focus
      if (bodyEl.classList.contains('has-active-search-window')) {
        if (key === 'Tab' || key === 'Tab' || key === 9) {
          searchInput.focus();
        }
      }
  });
};


// search functionality
function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

// The strategy is as follows:
// First, assign a value to each word in the document:
//  Words that correspond to search terms (stemmer aware): 40
//  Normal words: 2
//  First word in a sentence: 8
// Then use a sliding window with a constant number of words and count the
// sum of the values of the words within the window. Then use the window that got the
// maximum sum. If there are multiple maximas, then get the last one.
// Enclose the terms in <b>.
function makeTeaser(body, terms) {
  var TERM_WEIGHT = 40;
  var NORMAL_WORD_WEIGHT = 2;
  var FIRST_WORD_WEIGHT = 8;
  //var TEASER_MAX_WORDS = 17;
  var TEASER_MAX_CHARS = 63;

  var stemmedTerms = terms.map(function (w) {
    return elasticlunr.stemmer(w.toLowerCase());
  });

  var termFound = false;
  var index = 0;
  var weighted = []; // contains elements of ["word", weight, index_in_document]

  // split in sentences, then words
  var sentences = body.toLowerCase().split(". ");

  for (var i in sentences) {
    var words = sentences[i].split(" ");
    var value = FIRST_WORD_WEIGHT;

    for (var j in words) {
      var word = words[j];

      if (word.length > 0) {
        for (var k in stemmedTerms) {
          if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
          }
        }
        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length;
      index += 1;  // ' ' or '.' if last word in sentence
    }

    index += 1;  // because we split at a two-char boundary '. '
  }

  if (weighted.length === 0) {
    return body;
  }

  var windowWeights = [];
  var windowSize = 0;

  // loop over words (weighted) till max chars is reached adding a counter to windowSize every time a new word has passed
  var sumChars = 0;
  for (var i = 0; i < weighted.length; i++) {
    sumChars += weighted[i][0].length;
    if (sumChars <= TEASER_MAX_CHARS) {
      windowSize++;
    }
  }

  // We add a window with all the weights first
  var curSum = 0;
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1];
  }
  windowWeights.push(curSum);

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1];
    curSum += weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  // If we didn't find the term, just pick the first window
  var maxSumIndex = 0;
  if (termFound) {
    var maxFound = 0;
    // backwards
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i];
        maxSumIndex = i;
      }
    }
  }

  var teaser = [];
  var startIndex = weighted[maxSumIndex][2];
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i];
    if (startIndex < word[2]) {
      // missing text from index to start of `word`
      teaser.push(body.substring(startIndex, word[2]));
      startIndex = word[2];
    }

    startIndex = word[2] + word[0].length;
    teaser.push(body.substring(word[2], startIndex));

  }
  teaser.push("…");
  return teaser.join("");
}

function formatSearchResultTitle(item) {
  var pathArray = item.ref.split( '/' );

  // first directory is in 4th element of split path array
  var firstPartTitle = pathArray[3];

  // last directory is in 2nd to last element of array
  var lastPartTitle = item.doc.title;

  var fullTitle = firstPartTitle + '<span class="gray1 dib pl2">' + ' / ' + lastPartTitle + '</span>';

  return fullTitle; 
}

function formatSearchResultItem(item, terms) {
  var li = document.createElement("li");
  var createA = document.createElement("a");
  li.appendChild(createA);
  var teaserTitle = formatSearchResultTitle(item);
  li.classList.add("search-results__item");
  var hrefA = item.ref;
  createA.setAttribute('href', hrefA);
  createA.setAttribute('class','no-underline db pl1 pv2');
  createA.innerHTML = `<span class="capitalize ph3">${teaserTitle}</span>`;
  createA.innerHTML += `<span class='dn arrow fr'>↩</span>`;
  createA.innerHTML += `<div class="truncate pr2 ph3">${makeTeaser(item.doc.body, terms)}</div>`;
  return li;
}

function initSearch() {
  var searchInput = document.getElementById("search");
  var searchForm = document.getElementById("search-form");
  var inputReset = searchForm.nextElementSibling;

  if (!searchInput) {
    return;
  }

  var searchResults = document.querySelector(".search-results");
  var searchResultsHeader = document.querySelector(".search-results__header");
  var searchResultsItems = document.querySelector(".search-results__items");
  var MAX_ITEMS = 200;
  var options = {
    bool: "AND",
    expand: true, // turn on partial word search
    fields: {
      title: {boost: 2},
      body: {boost: 1},
    }
  };
  var currentTerm = "";
  var index = elasticlunr.Index.load(window.searchIndex);
  // toggle search window
  var toggleSearchWindow = document.getElementById('js-search-window-toggle');
  var bodyEl = document.body;
  var searchOverlay = document.getElementById('search-overlay');
  var searchWindow = document.getElementById('search-window');
  var searchActive = bodyEl.classList.contains('has-active-search-window');

  if (toggleSearchWindow !== null) {
    toggleSearchWindow.onclick = function() {
      inputReset.style.display="none";

      //activate search
      bodyEl.classList.toggle('has-active-search-window');
      //put input in focus when activating search
      searchInput.focus();

      searchInput.value = "";
      searchResultsHeader.value = "";
      searchResults.style.display = searchInput.value.trim() === "" ? "none" : "block";
    }
    searchOverlay.addEventListener('click', function(e){
    	if (!searchWindow.contains(e.target)){
        bodyEl.classList.toggle('has-active-search-window');
      }
    })
  }

  // Don't refresh the page on enter
  searchInput.addEventListener('keydown', function(event){
    var key = event.key || event.keyCode;

    if (key === 13 || key === "Enter") {
      event.preventDefault();
      return false;
    }
  })


  searchInput.addEventListener("keyup", debounce(function() {
    inputReset.style.display="block";

    searchResultsHeader.value = "";
    var term = searchInput.value.trim();
    /*
    //removed to fix: a state where there’s a valid search term, but no results

    if (term === currentTerm || !index) {
      return;
    }*/

    searchResults.style.display = term === "" ? "none" : "block";
    searchResults.style.overflowY = term === "" ? "hidden" : "scroll";
    searchResultsItems.innerHTML = "";
    if (term === "") {
      inputReset.style.display="none";
      return;
    }

    var results = index.search(term, options).filter(function (r) {
      return r.doc.body !== "";
    });

    if (results.length === 0) {
      searchResultsHeader.innerText = `No search results for '${term}'.`;
      return;
    }

    currentTerm = term;
    searchResultsHeader.innerText = `${results.length} search results for '${term}':`;
    for (var i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
      if (!results[i].doc.body) {
        continue;
      }
      searchResultsItems.appendChild(formatSearchResultItem(results[i], term.split(" ")));
    }
  }, 150));

  // reset input button
  inputReset.onclick=function(){
    document.getElementById('search-form').reset();
  }
  searchForm.addEventListener("reset", function(event){
    var e = document.createEvent('KeyboardEvent');
    e.initEvent("keyup", false, true);
    searchInput.dispatchEvent(e);
  });

}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initToggleSearchWindow();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    initHotKeys();
  });
}

if (window.location.href.includes("docs")) {
  tippy('.tooltip', {
    content(reference) {
      const title = reference.getAttribute('title')
      reference.removeAttribute('title')
      return title
    },
    animateFill: false,
    animation: 'fade'
  })
}

// same-page navigation on-scroll behaviour

if (document.body.classList.contains("page-indiced")) {
let h2 = document.getElementsByTagName("h2");
let h3 = document.getElementsByTagName("h3");
let all = document.querySelectorAll("nav details li a");
let headers = document.querySelectorAll("details summary");

// smooth scrolling on click
all.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    let target = document.querySelector(event.target.hash);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  all.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });

});

}