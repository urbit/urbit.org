import Head from "next/head";
import Meta from "../../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import { join } from "path";
import { getPage } from "../../lib/lib";
import { Markdown } from "foundation-design-system";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/DocsSidebar";
import GettingStartedTree from "../../cache/getting-started.json";

export default function UsingLayout({ posts, data, params, search, markdown }) {
  const router = useRouter();

  const select = (href) => {
    const isSelected =
      `/getting-started${href === "" ? "" : `/${href}`}` === router.asPath;
    return classnames({
      dot: isSelected,
      "text-green-400": isSelected,
      "text-wall-500": !isSelected,
    });
  };

  let menu = [{ title: "Overview", slug: "", weight: 0 }],
    additional = [];

  posts.pages.map((post) => {
    if (post?.tag === "additional") {
      additional.push(post);
    } else {
      menu.push(post);
    }
  });

  menu.sort((a, b) => a.weight > b.weight);
  additional.sort((a, b) => a.weight > b.weight);

  const rootClasses = "pl-0 font-semibold text-base hover:text-green-400";

  return (
    <>
      <Head>
        <title>{data.title} • Getting Started • urbit.org</title>
        {Meta(data)}
      </Head>
      <div className="flex h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          <p className="uppercase pb-1 font-bold text-xs text-wall-400">
            Getting Started
          </p>
          <ul>
            {menu.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8">
            <p className="uppercase pb-1 font-bold text-xs text-wall-400">
              Additional Guides
            </p>
            {additional.map((post) => (
              <li>
                <Link href={post.slug} passHref>
                  <a className={`relative ${select(post.slug)} ${rootClasses}`}>
                    {post.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          description={data.description}
          search={search}
          section={"Getting Started"}
          params={params}
          disableToC
        >
          <div className="markdown">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
          {!params?.slug && <LaunchCards />}
        </ContentArea>
      </div>
    </>
  );
}

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/getting-started">Getting Started</Link>,
  ];
  let thisLink = "/getting-started";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

function LaunchCards() {
  const info = [
    {
      title: "Desktop app",
      subtitle: "Deploy Urbit on your local system",
      points: [
        {
          title: "Benefits",
          content: ["Free", "Set up in minutes"],
        },
        {
          title: "Considerations",
          content: ["Limited functionality with certain applications"],
        },
      ],
      svg: (
        <svg
          width="35"
          height="49"
          viewBox="0 0 35 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.43609 18.2477H10.856V2.43515C10.8608 1.09 11.9608 1.65662e-05 13.3153 1.65662e-05H21.4235C22.0767 -0.00236832 22.7012 0.252829 23.1623 0.71078C23.6234 1.16632 23.8828 1.7888 23.8828 2.43515V18.2477H27.3123C28.3714 18.2453 29.3393 18.8535 29.7883 19.8075C30.2399 20.7639 30.091 21.8896 29.4089 22.6982L19.4734 34.5206C18.9523 35.1359 18.1837 35.4937 17.3744 35.4937C16.565 35.4937 15.7965 35.136 15.2753 34.5206L5.3325 22.6982C4.64802 21.8896 4.50151 20.7591 4.95304 19.8051C5.40457 18.8511 6.37481 18.2429 7.43635 18.2477H7.43609Z"
            fill="#24221E"
          />
          <path
            d="M0 46.4217V44.5866C0.00657627 43.5411 0.854839 42.6928 1.90369 42.6928H32.8365C33.8853 42.6928 34.7336 43.5411 34.7402 44.5866V46.4217C34.7402 47.4738 33.8886 48.3287 32.8365 48.3352H1.90369C0.851556 48.3286 0 47.4738 0 46.4217Z"
            fill="#24221E"
          />
        </svg>
      ),
      href: "/getting-started/desktop",
    },
    {
      title: "Server setup",
      subtitle: "Deploy Urbit on a cloud/VPS provider",
      points: [
        {
          title: "Benefits",
          content: ["Complete data ownership", "Accessibility from anywhere"],
        },
        {
          title: "Considerations",
          content: [
            "Requires monthly cloud service subscription & (one-time) Urbit ID purchase",
            "Requires Linux proficiency",
          ],
        },
      ],
      svg: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 61 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M49.2551 15.2806C49.5291 16.4304 50.4122 17.3353 51.5533 17.636H51.5527C54.4975 18.5808 57.035 20.4998 58.7427 23.0815C60.4504 25.6633 61.227 28.7507 60.9424 31.8327C60.5301 35.2182 58.8836 38.3348 56.3195 40.5811C53.7554 42.8274 50.4492 44.0491 47.0418 44.0118H35.4601V35.1486H38.0641C38.8723 35.1521 39.6109 34.7022 39.9547 33.9966C40.2985 33.2909 40.1869 32.4547 39.6658 31.8567L32.0952 23.1122C31.6983 22.657 31.1132 22.3924 30.4969 22.3924C29.8807 22.3924 29.2955 22.657 28.8987 23.1122L21.3337 31.8567C20.8144 32.4547 20.701 33.2874 21.0448 33.9948C21.3867 34.7005 22.1237 35.1503 22.9301 35.1486H25.5414V44.0118H13.9581C10.5508 44.049 7.24457 42.8274 4.68045 40.5811C2.11627 38.3347 0.469828 35.2181 0.057545 31.8327C-0.227016 28.7505 0.549654 25.6631 2.25729 23.0815C3.9652 20.4998 6.50276 18.5808 9.44724 17.636C10.5883 17.3353 11.4714 16.4304 11.7454 15.2806C12.9452 9.48101 16.7593 4.5598 22.0737 1.9542C27.3911 -0.651399 33.6097 -0.651399 38.9268 1.9542C44.2412 4.56034 48.0555 9.48122 49.2551 15.2806Z"
            fill="#24221E"
          />
        </svg>
      ),
      href: "/getting-started/server",
    },
    {
      title: "Hosted urbit",
      subtitle: "Deploy Urbit on a managed service",
      points: [
        {
          title: "Benefits",
          content: [
            "Accessibility from anywhere",
            "Streamlined setup for ownership and identity",
            "No technical proficiency required",
          ],
        },
        {
          title: "Considerations",
          content: [
            "Requires monthly subscription",
            "Requires trust in your service provider",
          ],
        },
      ],
      svg: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="50" height="23.1481" rx="10" fill="#24221E" />
          <rect
            y="26.8519"
            width="50"
            height="23.1481"
            rx="10"
            fill="#24221E"
          />
          <ellipse
            cx="40.4167"
            cy="11.5741"
            rx="2.91667"
            ry="3.24074"
            fill="white"
          />
          <ellipse
            cx="40.4167"
            cy="38.4259"
            rx="2.91667"
            ry="3.24074"
            fill="white"
          />
        </svg>
      ),
      href: "/getting-started/hosted",
    },
  ];
  return (
    <div className="flex flex-col space-y-8 mt-8">
      {info.map((e) => {
        return (
          <div className="p-8 bg-wall-100 rounded-xl max-w-screen-md flex flex-col">
            <div className="flex">
              <div className="pl-4 pr-8 justify-center items-center flex">
                {e.svg}
              </div>
              <div className="flex flex-col">
                <h4 className="text-2xl">{e.title}</h4>
                <p className="font-light text-lg">{e.subtitle}</p>
              </div>
            </div>
            <div className="flex mt-8 border-b-neutral-300 pt-2 pb-5 ">
              {e.points.map((section) => {
                return (
                  <div className="basis-1/2">
                    <p className="uppercase font-bold text-sm text-black">
                      {section.title}
                    </p>
                    <ul className="mx-8 my-2 list-disc text-sm flex flex-col space-y-2">
                      {section.content.map((point) => (
                        <li>{point}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <Link href={e.href} passHref>
              <a className="button-lg max-w-fit text-white mt-4 bg-green-400">
                Get Started
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps({ params }) {
  let posts = GettingStartedTree;

  const { data, content } = getPage(
    join(
      process.cwd(),
      "content/getting-started",
      params.slug?.join("/") || "/"
    )
  );

  const markdown = JSON.stringify(Markdown.parse({ post: { content } }));

  return { props: { posts, data, markdown, params } };
}

export async function getStaticPaths() {
  const posts = GettingStartedTree;

  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/getting-started", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
