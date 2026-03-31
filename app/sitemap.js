import fs from "fs";
import path from "path";
import { getMarkdownContent } from "./lib/queries";

const getBaseUrl = async () => {
  const config = await getMarkdownContent("config.md");
  return config.frontMatter?.site_metadata?.canonicalUrl || "https://urbit.org";
};

const getIndexEntries = () => {
  const indexPath = path.join(process.cwd(), "public/content-index.json");
  if (!fs.existsSync(indexPath)) {
    return [];
  }

  const raw = fs.readFileSync(indexPath, "utf-8");
  const data = JSON.parse(raw);
  return Array.isArray(data.entries) ? data.entries : [];
};

export const dynamic = "force-static";

export default async function sitemap() {
  const baseUrl = await getBaseUrl();
  const entries = getIndexEntries();
  const urls = new Set(entries.map((entry) => entry.url));
  urls.add(`${baseUrl}/llms.txt`);
  urls.add(`${baseUrl}/agents.md`);

  return Array.from(urls).map((url) => ({
    url,
  }));
}
