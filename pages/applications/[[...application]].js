import Head from "next/head";
import Link from "next/link";
import { join } from "path";
import CopyLink from "../../components/CopyLink";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  getPage,
  getAllPosts,
} from "@urbit/foundation-design-system";
import ob from "urbit-ob";
import IntraNav from "../../components/IntraNav";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GatewayHeader from "../../components/gateway/GatewayHeader";
import Gateway404 from "../../components/gateway/Gateway404";
import MetadataBlock from "../../components/gateway/MetadataBlock";
import MetadataLink from "../../components/gateway/MetadataLink";
import Description from "../../components/gateway/Description";
import { getGrantsByShortcode } from "../../lib/lib";
import GrantPreview from "../../components/GrantPreview";

const ApplicationPage = ({ data, markdown, organisation, matchedGrants, search, params }) => {
  const { application } = params;
  if (!ob.isValidPatp(application[0])) {
    return <Gateway404 type="application" />;
  }

  let devLink;

  if (organisation) {
    devLink = (
      <MetadataLink
        title="Developer"
        href={`/organizations/${organisation.slug}`}
        content={organisation.title}
      />
    );
  } else {
    devLink =
      ob.isValidPatp(data?.developer || "") && data?.developer.length <= 14 ? (
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
      );
  }
  return (
    <Container>
      <Head>
        <title>{data.title} • Urbit Application</title>
        <link rel="icon" type="image/png" href="/images/favicon.ico" />
        <meta name="twitter:card" content="summary" key="twitter-card" />
        <meta
          name="og:title"
          content={`${data.title} • Urbit Application`}
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
        <meta property="twitter:image" content={data.image} key="image" />
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section className="space-y-12" narrow>
          <GatewayHeader
            title={data.title}
            color={data?.bgColor}
            image={data?.image || data?.bgColor}
            item="Application"
          />

          <div className="flex flex-wrap justify-between">
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
            {devLink}
            <CopyLink
              className="basis-1/2 sm:basis-1/4"
              content={data.shortcode ? data.shortcode : data.title}
            />
          </div>
          <Description
            description={data.description}
            fallback="An application on Urbit."
            markdown={markdown}
          />
          <hr className="text-wall-200" />
          {matchedGrants.length > 0 && <div className="basis-full flex flex-col space-y-2">
            <p className="font-semibold text-wall-400">Related Grants</p>
            {matchedGrants.map((grant) => {
              return <GrantPreview grant={grant} />
            })}
          </div>}

          <div class="bg-wall-100 py-4 px-6 border-2 border-wall-200 rounded-xl">
            <p class="text-sm text-wall-400">
              <span class="font-bold">Disclaimer:</span> Applications may not be
              audited for security and might contain malicious code or
              vulnerabilities that could lead to unwanted interaction with your
              ship. Explore at your own risk.
            </p>
          </div>

          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <Link href="/getting-started/installing-applications" passHref>
                <a className="button-lg max-w-xs bg-green-400 text-white">
                  How to Install an Urbit Application
                </a>
              </Link>
            </div>
          </div>
          <hr className="text-wall-200" />

          <div className="flex flex-col space-y-1">
            <p>
              Have an application you'd like to share publicly through
              urbit.org?
            </p>
            <Link href="/applications/submit" passHref>
              <a className="font-bold text-green-400">
                Submit your application
              </a>
            </Link>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
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

  const organisation =
    getAllPosts(["title", "slug", "ships"], "organizations").filter((e) =>
      e.ships.includes(params.application?.[0])
    )[0] || null;

  const markdown =
    content !== ""
      ? JSON.stringify(Markdown.parse({ post: { content } }))
      : null;

  const matchedGrants = getGrantsByShortcode(params.application)
    .filter((e) => !e.extra.canceled)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!data.title) {
    data = {
      title: params.application?.join("/"),
      description: "An application on Urbit.",
    };
  }

  return {
    props: {
      data,
      markdown,
      organisation,
      matchedGrants,
      params,
    },
  };
};

export default ApplicationPage;
