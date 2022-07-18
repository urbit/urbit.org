import Head from "next/head";
import Link from "next/link";
import { getPage } from "../../lib/lib";
import { join } from "path";
import CopyLink from "../../components/CopyLink";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
} from "foundation-design-system";
import ob from "urbit-ob";
import GatewayHeader from "../../components/gateway/GatewayHeader";
import Gateway404 from "../../components/gateway/Gateway404";
import MetadataBlock from "../../components/gateway/MetadataBlock";
import MetadataLink from "../../components/gateway/MetadataLink";
import Description from "../../components/gateway/Description";

const GroupPage = ({ data, markdown, params }) => {
  const { group } = params;
  if (!ob.isValidPatp(group?.[0] || "")) {
    return <Gateway404 type="group" />;
  }

  const color = data?.tile && data?.tile.startsWith("#");
  const reqParams = [
    color ? `color=${encodeURIComponent(data.tile)}` : "",
    !color
      ? `images=${encodeURIComponent(
          data?.tile ||
            "https://media.urbit.org/public-links/placeholder-image.png"
        )}`
      : "",
  ].filter((e) => e !== "");
  const image = `https://urbit-id-og-cards-667veow91-urbit.vercel.app/${
    data.title
  }.png?${reqParams.join("&")}`;

  return (
    <Container>
      <Head>
        <title>{data.title} • Groups • urbit.org</title>
        <link rel="icon" type="image/png" href="/images/favicon.ico" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <meta
          name="og:title"
          content={`${data.title} • Groups • urbit.org`}
          key="title"
        />
        <meta
          name="og:description"
          content={
            data?.description || "View more about this group on urbit.org."
          }
          key="description"
        />
        <meta property="twitter:image" content={image} key="image" />
      </Head>
      <SingleColumn>
        <Section className="space-y-12" narrow>
          <GatewayHeader
            title={data.title}
            image={data?.tile}
            item="Urbit Group"
          />
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            <MetadataBlock
              title="Group Type"
              content={data.type ? data.type : "Unknown"}
            />
            <MetadataBlock
              title="Members"
              content={
                data.participant_range ? data.participant_range : "Unknown"
              }
            />
            <MetadataLink
              title="Host"
              href={`/ids/${group[0]}`}
              content={group[0]}
            />
            <CopyLink
              className="basis-1/2"
              content={data.shortcode ? data.shortcode : data.title}
            />
          </div>
          <Description
            description={data.description}
            fallback="A group on Urbit."
            markdown={markdown}
          />
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-6">
            <h3>
              Urbit is a clean-slate, peer-to-peer operating system and network.
            </h3>
            <div className="flex flex-col space-y-4">
              <p className="text-sm font-semibold text-wall-400">
                Get on the network and join this group.
              </p>
              <Link href="/guides/joining-groups" passHref>
                <a className="button-lg max-w-xs bg-green-400 text-white">
                  How to join a group
                </a>
              </Link>
            </div>
          </div>
          <hr className="text-wall-200" />
          <div className="flex flex-col space-y-1">
            <p>Have a group you'd like to share publicly through urbit.org?</p>
            <Link href="/groups/submit" passHref>
              <a className="type-ui text-green-400">Submit your group</a>
            </Link>
          </div>
          <Link href="/" passHref>
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
    join(process.cwd(), "content/groups", params.group?.join("/") || "/")
  ) || { data: {}, content: "" };

  const markdown =
    content !== ""
      ? JSON.stringify(Markdown.parse({ post: { content } }))
      : null;

  if (!data.title) {
    data = { title: params.group?.join("/"), description: "A group on Urbit." };
  }

  return {
    props: {
      data,
      markdown,
      params,
    },
  };
};

export default GroupPage;
