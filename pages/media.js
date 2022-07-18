import Head from "next/head";
import Link from "next/link";
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
} from "foundation-design-system";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllPosts } from "../lib/lib";

export function MediaPreview({ event, dir, className }) {
  // Event tiles have a 'dark mode' used when their background images are dark and white text is needed for legibility.
  const grayText = event.extra?.dark ? "text-midWhite" : "text-wall-500";
  const blackText = event.extra?.dark ? "text-white" : "text-wall-600";

  return (
    <div
      key={event.slug}
      className={`mb-24 cursor-pointer bg-wall-100 rounded-xl h-96 bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage:
          `${
            event.extra?.overlay
              ? "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),"
              : ""
          }url(${event.extra?.image})` || "",
      }}
    >
      <Link href={`${dir ? dir : "/events/"}${event.slug}`}>
        <div className="flex flex-col p-8 justify-between items-between h-full relative">
          <div className="grow-1 flex flex-col justify-center h-full">
            <h3 className={`mb-4 ${blackText}`}>{event.title}</h3>
            <h4 className={grayText}>{event?.type}</h4>
          </div>
          <div className="absolute left-8 bottom-8 w-full">
            <p className={grayText}>{event.extra.host}</p>
            <p className={grayText}>{event.extra.guests}</p>
          </div>
          {event.extra.youtube ? (
            <a
              onClick={(e) => e.stopPropagation()}
              className="absolute w-16 h-16 right-8 bottom-8 bg-white flex items-center justify-center rounded-full"
              target="_blank"
              href={`https://www.youtube.com/watch?v=${event.extra.youtube}`}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 7.56699C11.5833 7.75944 11.5833 8.24056 11.25 8.43301L6.75 11.0311C6.41667 11.2235 6 10.983 6 10.5981L6 5.40192C6 5.01702 6.41667 4.77646 6.75 4.96891L11.25 7.56699Z"
                  fill="black"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </Link>
    </div>
  );
}

export default function Media({ posts, search }) {
  const post = {
    title: "Media",
    description:
      "A selection of external appearances by the Tlon Corporation and the Urbit Foundation.",
  };
  return (
    <Container>
      <Head>
        <title>Media • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow>
          <div className="measure">
            <h1 className="pb-16">Media</h1>
            <p className="pb-6">
              Selected external media appearances from Tlon and the Urbit
              Foundation.
            </p>
          </div>
        </Section>
        <Section narrow>
          {posts.map((post) => {
            return <MediaPreview event={post} dir="/media/" />;
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "media",
    "date"
  );

  return {
    props: { posts },
  };
}
