import { getMarkdownContent } from "../lib/queries";

export async function generateMetadata() {
  const overviewConfig = await getMarkdownContent("overview/config.md");
  const image = overviewConfig.frontMatter?.image;

  if (!image) {
    return {};
  }

  return {
    openGraph: {
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  };
}

export default function OverviewLayout({ children }) {
  return children;
}
