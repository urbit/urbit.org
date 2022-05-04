import Head from "next/head";
import Link from "next/link";
import { getPage } from "../../lib/lib";
import { join } from "path";
import CopyLink from "../../components/CopyLink";
import Container from "../../components/Container";
import SingleColumn from "../../components/SingleColumn";
import Section from "../../components/Section";
import ob from "urbit-ob";
import Markdown from "../../components/Markdown";
import GatewayHeader from "../../components/gateway/GatewayHeader";
import Gateway404 from "../../components/gateway/Gateway404";
import MetadataBlock from "../../components/gateway/MetadataBlock";
import MetadataLink from "../../components/gateway/MetadataLink";
import Description from "../../components/gateway/Description";

const ApplicationPage = ({ data, markdown, params }) => {
  const { application } = params;
  if (!ob.isValidPatp(application[0])) {
    return <Gateway404 type="application" />;
  }
  const reqParams = [
    data?.bgColor ? `color=${encodeURIComponent(data?.bgColor)}` : "",
    data?.image ? `images=${encodeURIComponent(data?.image)}` : "",
  ].filter((e) => e !== "");
  const image = `https://urbit-id-og-cards-78ieodof2-urbit.vercel.app/${
    data.title
  }.png?${reqParams.join("&")}`;

  return (
    <Container>
      <Head>
        <title>{data.title} • Applications • urbit.org</title>
        <link rel="icon" type="image/png" href="/images/favicon.ico" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <meta
          name="og:title"
          content={`${data.title} • Applications • urbit.org`}
          key="title"
        />
        <meta
          name="og:description"
          content={
            data?.description ||
            "View more about this application on urbit.org."
          }
          key="description"
        />
        <meta property="twitter:image" content={image} key="image" />
      </Head>
      <SingleColumn>
        <Section className="space-y-12" narrow>
          <GatewayHeader
            title={data.title}
            color={data?.bgColor}
            image={data?.image || data?.bgColor}
            item="Urbit Application"
          />
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <MetadataBlock
              title="License"
              content={data.license ? data.license : "Unknown"}
            />
            {data?.website && (
              <MetadataLink
                title="Website"
                href={data?.website}
                content={
                  data?.website ? data.website.replace(/^https?:\/\//, "") : ""
                }
              />
            )}
            {ob.isValidPatp(data?.developer || "") &&
            data?.developer.length < 10 ? (
              <MetadataLink
                title="Developer"
                href={`/ids/${data.developer}`}
                content={data.developer}
              />
            ) : (
              <MetadataBlock
                title="Developer"
                content={data.developer ? data.developer : "Unknown"}
              />
            )}
            <CopyLink
              className="basis-1/2"
              content={data.shortcode ? data.shortcode : data.title}
            />
          </div>
          <Description
            description={data.description}
            fallback="An application on Urbit."
            markdown={markdown}
          />
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-6">
            <h3>
              Urbit is a clean-slate, peer-to-peer operating system and network.
            </h3>
            <div className="flex flex-col space-y-4">
              <p className="text-sm font-semibold text-wall-400">
                Learn how to install an Urbit application
              </p>
              <Link href="/guides/installing-applications">
                <button className="button-lg max-w-xs bg-green-400 text-white">
                  Installing Urbit applications
                </button>
              </Link>
            </div>
          </div>
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-1">
            <p>
              Have an application you'd like to share publicly through
              urbit.org?
            </p>
            <Link href="/applications/submit">
              <a className="type-ui text-green-400">Submit your application</a>
            </Link>
          </div>
          <Link href="/">
            <a className="text-xl pt-8 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=604800"
  );

  let { data, content } = getPage(
    join(
      process.cwd(),
      "content/applications",
      params.application?.join("/") || "/"
    )
  ) || { data: {}, content: "" };

  if (!data.title) {
    data = {
      title: params.application?.join("/"),
      description: "An application on Urbit.",
    };
  }

  const markdown = await Markdown({ post: { content: content } }, true);

  return {
    props: {
      data,
      markdown,
      params,
    },
  };
};

export default ApplicationPage;
