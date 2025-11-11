import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import ThemeManager from "../../components/ThemeManager";
import Link from "next/link";

const BLOG_PATH = "app/content/grants";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);

export async function generateMetadata({ params }, parent) {
  const postSlug = `/grants/${params.grant}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const parentMetadata = await parent;
  const image = parentMetadata?.openGraph?.images?.[0]?.url;

  return {
    title: `Grants • ${postData.frontMatter.title}`,
    description: `${postData.frontMatter.extra.description}`,
    openGraph: {
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      grant: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });
  // console.log(paths)
  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/grants/${params.grant}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra, taxonomies } = postData.frontMatter;
  // const postMeta = await getYaml(postSlug);
  // const config = await getYaml("/config.md");
  // const components = postData?.components;

  return (
    <section className="grant-section block md:grid md:grid-cols-6 mb-32 mt-9 md:mt-[6rem] container">
      <ThemeManager />

      <div className="col-span-1"></div>
      <div className="col-span-4 tracking-[.01em]">
        <div>
          <div className="flex flex-col !text-xlarge md:text-30px leading-120">
            <span className="font-[700]">{title}</span>
            <span className="">{extra?.description}</span>
          </div>
          <div className="flex flex-col mt-8 !text-large leading-120 font-[400]">
            <span className="">{formatDate(date)}</span>
            <span className="">Reward: {extra.reward} </span>
            <span className="">ID: {extra?.grant_id}</span>
            <span className="">Champion(s): {extra?.champion}</span>
          </div>
          <div className="my-[2.8rem]">
            <Link className="apply-button" href="https://airtable.com/apppnWSqfsVvUwkWh/shrCi54rEDxgSZr3z">
              Apply
            </Link>
          </div>
        </div>
        <div className="">
          {Markdoc.renderers.react(postData.content, React)}
        </div>
      </div>
    </section>
  );
}
