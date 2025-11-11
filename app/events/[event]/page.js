import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";
import {DateRange} from "../../components/DateRange";

const BASE_PATH = "app/content/events";
const POSTS_DIR = path.join(process.cwd(), BASE_PATH);

export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      event: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const eventSlug = `/events/${params.event}.md`; // Append .md here to use in the file path
  const eventData = await getMarkdownContent(eventSlug, "toml");
  const { 
    title, 
    description, 
    image,
    registration_url, 
    starts,
    ends,
    location 
  } = eventData.frontMatter;

  return (
    <section className="grid md:grid-cols-6 mb-32 mt-9 md:mt-[6rem] container">
      
      <div className="col-start-2 col-span-4 text-xlarge leading-[120%]">
        <div className="flex flex-col mb-24">
          <div className="text-2xlarge leading-[120%]">{title}</div>
          <div className="text-xlarge mb-8">{description}</div>
          
          <div className="">{location}</div>
          <DateRange starts={starts} ends={ends} />

          {/* <div className="mb-8">{starts} - {ends}</div> */}
          
          <a href={registration_url} className="mt-4 action-button">Register</a>
        </div>
        
        {Markdoc.renderers.react(eventData.content, React)}
      </div>
    </section>
  );
}
