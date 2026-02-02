import Link from "next/link";
import Image from "next/image";

/**
 * RecommendedReading - Displays recommended blog posts in sidebar
 *
 * Shows 3 recommended posts with title, description, and optional image.
 * Used within SidebarElement on individual blog post pages.
 *
 * @param {Array} posts - Array of 3 post objects with title, description, slug, extra.image
 */
export function RecommendedReading({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="block group"
        >
            {(post.extra?.imageCard || post.extra?.image) && (
              <div className="mb-3 rounded-lg overflow-hidden w-full bg-gray-f5">
                <Image
                  src={post.extra?.imageCard || post.extra.image}
                  alt={post.title}
                  className="w-full h-auto max-h-[200px] object-cover transition-opacity group-hover:opacity-80"
                  width={800}
                  height={600}
                />
              </div>
            )}

          <h3 className="font-serif text-lg leading-120 mb-2 group-hover:text-gray-87 transition-colors">
            {post.title}
          </h3>
          <p className="font-sans text-base leading-120 text-gray-87 line-clamp-2">
            {post.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
