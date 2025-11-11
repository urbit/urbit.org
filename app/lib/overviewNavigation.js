/**
 * Calculate previous and next page navigation for overview pages
 *
 * @param {string} currentSection - The current section slug ('urbit-explained' or 'running-urbit')
 * @param {string|null} currentSlug - The current page slug, or null for intro pages
 * @param {object} urbitExplainedConfig - Config for urbit-explained section
 * @param {object} runningUrbitConfig - Config for running-urbit section
 * @returns {{prevPage: {url: string, label: string}|null, nextPage: {url: string, label: string}|null}}
 */
export function calculateOverviewNavigation(
  currentSection,
  currentSlug,
  urbitExplainedConfig,
  runningUrbitConfig
) {
  const sections = {
    'urbit-explained': urbitExplainedConfig,
    'running-urbit': runningUrbitConfig,
  };

  const currentConfig = sections[currentSection];
  const isIntroPage = currentSlug === null;

  // Get all pages in current section (excluding 'intro' as it's the landing page)
  const currentSectionPages = currentConfig.frontMatter.sections.filter(s => s !== 'intro');

  let prevPage = null;
  let nextPage = null;

  if (currentSection === 'urbit-explained') {
    if (isIntroPage) {
      // First page of first section - no previous, next is first page
      nextPage = {
        url: `/overview/urbit-explained/${currentSectionPages[0]}`,
        label: getPageTitle('urbit-explained', currentSectionPages[0]),
      };
    } else {
      const currentIndex = currentSectionPages.indexOf(currentSlug);

      if (currentIndex === 0) {
        // First page after intro
        prevPage = {
          url: '/overview/urbit-explained',
          label: 'Introduction',
        };
      } else {
        // Middle pages
        prevPage = {
          url: `/overview/urbit-explained/${currentSectionPages[currentIndex - 1]}`,
          label: getPageTitle('urbit-explained', currentSectionPages[currentIndex - 1]),
        };
      }

      if (currentIndex < currentSectionPages.length - 1) {
        // Not the last page in section
        nextPage = {
          url: `/overview/urbit-explained/${currentSectionPages[currentIndex + 1]}`,
          label: getPageTitle('urbit-explained', currentSectionPages[currentIndex + 1]),
        };
      } else {
        // Last page of urbit-explained - link to running-urbit intro
        nextPage = {
          url: '/overview/running-urbit',
          label: runningUrbitConfig.frontMatter.next_section_label || 'Running Urbit',
        };
      }
    }
  } else if (currentSection === 'running-urbit') {
    const runningUrbitPages = currentSectionPages;

    if (isIntroPage) {
      // Intro page of running-urbit
      prevPage = {
        url: `/overview/urbit-explained/${urbitExplainedConfig.frontMatter.sections.filter(s => s !== 'intro').slice(-1)[0]}`,
        label: getPageTitle('urbit-explained', urbitExplainedConfig.frontMatter.sections.filter(s => s !== 'intro').slice(-1)[0]),
      };
      nextPage = {
        url: `/overview/running-urbit/${runningUrbitPages[0]}`,
        label: getPageTitle('running-urbit', runningUrbitPages[0]),
      };
    } else {
      const currentIndex = runningUrbitPages.indexOf(currentSlug);

      if (currentIndex === 0) {
        // First page after intro
        prevPage = {
          url: '/overview/running-urbit',
          label: 'Introduction',
        };
      } else {
        // Middle/later pages
        prevPage = {
          url: `/overview/running-urbit/${runningUrbitPages[currentIndex - 1]}`,
          label: getPageTitle('running-urbit', runningUrbitPages[currentIndex - 1]),
        };
      }

      if (currentIndex < runningUrbitPages.length - 1) {
        // Not the last page
        nextPage = {
          url: `/overview/running-urbit/${runningUrbitPages[currentIndex + 1]}`,
          label: getPageTitle('running-urbit', runningUrbitPages[currentIndex + 1]),
        };
      }
      // Last page has no next page (nextPage remains null)
    }
  }

  return { prevPage, nextPage };
}

/**
 * Get a human-readable title for a page slug
 * Converts slug to title case (e.g., 'urbit-id' -> 'Urbit ID')
 */
function getPageTitle(section, slug) {
  // Special cases
  const specialCases = {
    'urbit-id': 'Urbit ID',
    'urbit-os': 'Urbit OS',
    'get-urbit-id': 'Get Urbit ID',
    'run-urbit-os': 'Run Urbit OS',
  };

  if (specialCases[slug]) {
    return specialCases[slug];
  }

  // Default: convert slug to title case
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
