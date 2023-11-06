import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Meta from "../Meta";
import ErrorPage from "../../pages/404";
import classnames from "classnames";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
} from "@urbit/foundation-design-system";
import IntraNav from "../IntraNav";
import Header from "../Header";
import Footer from "../Footer";
import MetadataBlock from "./MetadataBlock";

export default function BasicPage({
  section,
  post,
  markdown,
  search,
  children,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const metaPost = Object.assign({}, post);
  metaPost.title = `${post.title} - ${section}`;
  metaPost.description =
    section === "Podcast" ? `${post.podcast} - ${post.date}` : post.description;
  section === "Article" ? `${post.publication} - ${post.date}` : post.description;
  return (
    <Container>
      <Head>
        <title>
          {post.title} • {section}
        </title>
        {Meta(metaPost)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section narrow className="space-y-12">
          <div className="flex items-center space-x-4">
            <img src={post.image} className="w-36" />
            <div className="flex flex-col pl-2">
              <h1 className="text-3xl">
                {post.title}
              </h1>
              <p>{section}</p>
            </div>
          </div>
          {/* General purpose metadata bar -- podcast listen button is special-cased URL, flexed at the end of the row */}
          <div className="flex justify-between">
            <div className="flex space-x-12">
              {post?.podcast && (
                <MetadataBlock
                  title="Podcast"
                  content={post.podcast}
                />
              )}
              {post?.publication && (
                <MetadataBlock
                  title="Publication"
                  content={post.publication}
                />
              )}
              {post?.author && (
                <MetadataBlock
                  title="Author"
                  content={post.author}
                />
              )}
              {post?.date && (
                <MetadataBlock
                  title="Date"
                  content={post.date}
                />
              )}

              {post?.twitter && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Twitter</p>
                  <Link href={"http://twitter.com/" + post.twitter}>
                    <a className="text-green-400 text-sm font-semibold font-mono">@{post.twitter}</a>
                  </Link>
                </div>
              )}


              {post?.URL && section !== "Podcast" && section !== "Article" && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Website</p>
                  <a
                    className="text-green-400 text-sm font-semibold font-mono"
                    href={post.URL}
                  >
                    {post.URL.slice(post.URL.indexOf("://") + 3)}
                  </a>
                </div>
              )}

              {post?.URL && section === "Urbit Marketplace" && (
                <div className="flex flex-col">
                  <p className="font-bold text-wall-400">Accepts</p>
                  <p className="text-sm font-semibold font-mono">
                    {post.payment.join(", ")}
                  </p>
                </div>
              )}
            </div>


            
            {post?.URL && section === "Podcast" && (
              <a
                href={post.URL}
                className="button-lg bg-green-400 text-white cursor-pointer flex space-x-2"
              >
                <img src="/images/sound.svg" />
                &nbsp;Listen
              </a>
            )}
            {post?.URL && section === "Article" && (
              <a
                href={post.URL}
                className="button-lg bg-green-400 text-white cursor-pointer flex space-x-2"
              >
                Read
              </a>
            )}
          </div>
          <div className="flex">
            <div className="markdown w-full">
              <Markdown.render content={JSON.parse(markdown)} />
              {children}
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
