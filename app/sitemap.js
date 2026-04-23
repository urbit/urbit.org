import fs from "fs";
import path from "path";
import { globSync } from "glob";
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

const getGeneratedPublicUrls = (baseUrl) => {
  const publicDir = path.join(process.cwd(), "public");
  const files = new Set([
    ...globSync(path.join(publicDir, "**/*.md"), { nodir: true, dot: true }),
    ...globSync(path.join(publicDir, ".agents/**/*.md"), { nodir: true, dot: true }),
  ]);

  return Array.from(files).map((filePath) => {
    const relativePath = path.relative(publicDir, filePath).replace(/\\/g, "/");
    return new URL(`/${relativePath}`, baseUrl).toString();
  });
};

export const dynamic = "force-static";

export default async function sitemap() {
  const baseUrl = await getBaseUrl();
  const entries = getIndexEntries();
  const urls = new Set(entries.map((entry) => entry.url));
  getGeneratedPublicUrls(baseUrl).forEach((url) => urls.add(url));
  urls.add(`${baseUrl}/llms.txt`);
  urls.add(`${baseUrl}/agents.md`);
  urls.add(`${baseUrl}/content-index.json`);

  return Array.from(urls).map((url) => ({
    url,
  }));
}
