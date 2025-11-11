import { getMarkdownContent, getYaml } from "../../lib/queries";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BLOG_PATH = "app/content/communities";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      community: JSON.parse(JSON.stringify(p)),
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const pageSlug = `/communities/${params.community}.md`; // Append .md here to use in the file path
  const pageData = await getMarkdownContent(pageSlug, "toml");
  const { title, description, image, group, links } = pageData.frontMatter;

  return (
    <section className="lg:grid grid-cols-6 gap-x-4 mb-32 mt-9 md:mt-[2rem] container min-h-[calc(100vh-var(--header-height)-28rem)]">
      <div className="col-span-1">
          <img className="mb-4 w-full h-auto" src={image} alt={title} />
      </div>
      <div className="flex flex-col col-span-4">
        <div className="text-2xlarge leading-[120%] font-[600] mb-4">
          {title}
        </div>
        {links.map((link) => {
          return (
            <a href={link.url} className="action-button mb-4 text-xlarge" key={link.url}>
              {link.label}
            </a>
          );
        })}
        <div>
          {description && <div className="mb-4">{description}</div>}
          {group && <div className="mb-4">{group}</div>}
          {Markdoc.renderers.react(pageData.content, React)}
        </div>
      </div>
    </section>
  );
}
