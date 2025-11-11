import { getMarkdownContent, getYaml } from "../lib/queries";
import { formatDate, formatAuthors } from "../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BLOG_PATH = "app/content/singles";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      page: JSON.parse(JSON.stringify(p)),
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/singles/${params.page}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra, taxonomies } = postData.frontMatter;

  return(
    <section className="grid md:grid-cols-6 mb-32 mt-9 md:mt-[6rem] container">
      <div className="col-span-4 col-start-2">
      {Markdoc.renderers.react(postData.content, React)}
      </div>
    </section>
  )

}