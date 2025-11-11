import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import { getAllBlogPosts, getRecommendedPosts } from "../../lib/blogUtils";
import { SidebarSlot } from "../../lib/layoutSlots";
import { SidebarElement } from "../../components/SidebarElement";
import { RecommendedReading } from "../../components/RecommendedReading";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BLOG_PATH = "app/content/blog";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);


export async function generateMetadata({ params }, parent) {
  const postSlug = `/blog/${params.blog}.md`;
  const postData = await getMarkdownContent(postSlug, "toml");

  const metadata = {
    title: `${postData.frontMatter.title} • Blog`,
    description: `${postData.frontMatter.description}`,
  };

  // Only add openGraph image if it exists
  if (postData.frontMatter?.extra?.image) {
    metadata.openGraph = {
      images: [
        {
          url: postData.frontMatter.extra.image,
          width: 1200,
          height: 630,
        },
      ]
    };
  }

  return metadata;
}
export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths
    ?.filter((postPath) => {
      const filename = path.basename(postPath, ".md");
      // Exclude config files from blog post generation
      return filename !== "config";
    })
    .map((postPath) => {
      const p = path.basename(postPath, ".md");
      return {
        blog: JSON.parse(JSON.stringify(p)),
        // Strip the .md extension
      };
    });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/blog/${params.blog}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra = {}, taxonomies } = postData.frontMatter;

  // Get recommended posts
  const allPosts = await getAllBlogPosts();
  const recommendedPosts = getRecommendedPosts(allPosts, params.blog);

  // Get config for aside title
  const config = await getMarkdownContent("config.md");
  const blogNavItem = config.frontMatter.nav.find(
    (item) => item.url === "/blog"
  );
  const asideTitle = blogNavItem?.aside_title || "Recommended Reading";

  return (
    <div>
      {/* Sidebar slot - renders in layout */}
      <SidebarSlot>
        <SidebarElement title={asideTitle}>
          <RecommendedReading posts={recommendedPosts} />
        </SidebarElement>
      </SidebarSlot>

      {/* Main content - no longer needs sidebar safe zone (handled by layout) */}
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto">
        <div className="max-w-[1080px]">
          <h1 className="text-6xl text-accent-1 font-serif font-tall leading-[120%] mb-4">
            {postData.frontMatter.title}
          </h1>
          <h3 className="text-3xl font-sans leading-[120%] mb-4">
            {postData.frontMatter.description}
          </h3>
          <div className="flex flex-row justify-between mb-8">
            <h3 className="text-large font-mono text-contrast-2 mb-4">{postData.frontMatter.date}</h3>
            {(extra.author || extra.ship) && (
              <div className="flex flex-col leading-[120%] mb-4 font-mono text-large tracking-[.01em] text-contrast-2">
                {extra.author && <div className="mb-[.1em] font-mono">{extra.author}</div>}
                {extra.ship && <div>{extra.ship}</div>}
              </div>
            )}
          </div>
          {Markdoc.renderers.react(postData.content, React)}
        </div>
      </section>
    </div>
  );
}
