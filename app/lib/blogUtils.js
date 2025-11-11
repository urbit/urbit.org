import { getPostsTree, getToml } from "./queries";

/**
 * Fetches all blog posts and sorts them by date (newest first)
 * @returns {Promise<Array>} Array of post objects with frontmatter data
 */
export async function getAllBlogPosts() {
  const posts = await getPostsTree("blog/");

  const allPostsData = await Promise.all(
    posts.map(async (post) => {
      const frontmatter = await getToml(post.relativePath);
      return {
        slug: post.slug,
        relativePath: post.relativePath,
        ...frontmatter.data,
      };
    })
  );

  // Sort by date (newest first)
  allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return allPostsData;
}

/**
 * Gets 3 recommended posts based on current post position
 * Algorithm:
 * - Standard case: [most recent, next chronologically, previous chronologically]
 * - If current is newest: [2nd, 3rd, 4th newest]
 * - If current is oldest: [newest, 2nd newest, 3rd newest]
 * - Current post is never included in recommendations
 *
 * @param {Array} allPosts - All blog posts sorted by date (newest first)
 * @param {string} currentSlug - Slug of the current post
 * @returns {Array} Array of 3 recommended post objects
 */
export function getRecommendedPosts(allPosts, currentSlug) {
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);
  const totalPosts = allPosts.length;

  // Safety check: need at least 4 posts (current + 3 recommendations)
  if (totalPosts < 4) {
    return allPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  }

  let recommended = [];

  // Edge case: current is most recent (index 0)
  if (currentIndex === 0) {
    recommended = [allPosts[1], allPosts[2], allPosts[3]];
  }
  // Edge case: current is oldest (last index)
  else if (currentIndex === totalPosts - 1) {
    recommended = [allPosts[0], allPosts[1], allPosts[2]];
  }
  // Standard case: return most recent, next (older), and previous (newer)
  else {
    recommended = [
      allPosts[0], // Most recent
      allPosts[currentIndex + 1], // Next (older)
      allPosts[currentIndex - 1], // Previous (newer)
    ];
  }

  // Remove duplicates and filter out current post (safety check)
  const uniquePosts = [...new Set(recommended)];
  return uniquePosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
}
