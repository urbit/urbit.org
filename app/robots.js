import { getMarkdownContent } from "./lib/queries";

const getBaseUrl = async () => {
  const config = await getMarkdownContent("config.md");
  return config.frontMatter?.site_metadata?.canonicalUrl || "https://urbit.org";
};

export const dynamic = "force-static";

export default async function robots() {
  const baseUrl = await getBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
