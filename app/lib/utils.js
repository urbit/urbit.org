


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return isNaN(date) ? dateString : date.toLocaleDateString(undefined, options);
}

const formatAuthors = (authors) => {
  let authorList = '';

  authors?.forEach((author, index) => {
    index === 0 ? authorList += '' : null;
    authorList += author.name;
    if (index < authors.length - 1) {
      authorList += ', ';
    }
  });

  return authorList;
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}


export { debounce, formatAuthors, formatDate };