import fs from "fs";
import { glob } from "glob";
import path from "path";
import matter from "gray-matter";

// import {toml} from 'toml';
import Markdoc from "@markdoc/markdoc";
import { markdocConfig } from "../markdocConfig";
const ARTICLES_PATH = "/app/content";
const POSTS_DIR = path.join(process.cwd(), ARTICLES_PATH);
const AGENT_DELIMITER_PATTERN = /^\s*---agent---\s*$/m;

// Source files may include an agent-only appendix after ---agent---. The public
// site should render only the human portion; build-agent-artifacts.js consumes
// the companion content separately for /.agents/*.md outputs.
const getHumanContent = (content = "") =>
  String(content || "").split(AGENT_DELIMITER_PATTERN)[0].trim();

async function getPostsTree(specificPath = "") {
  const postPaths = await glob(path.join(POSTS_DIR, specificPath, "**/*.md"));
  return postPaths?.map((postPath) => {
    const slug = path.basename(postPath, path.extname(postPath));
    const relativePathWithoutExt = path
      .relative(POSTS_DIR, postPath)
      .replace(/\.md$/, "");
    return {
      slug: slug,
      fullPath: postPath,
      relativePath: relativePathWithoutExt,
    };
  });
}

async function getYaml(slug) {
  const filePath = path.join(
    POSTS_DIR,
    slug.endsWith(".md") ? slug : `${slug}.md`
  );
  const fileSyncRead = fs.readFileSync(filePath, "utf-8");
  return matter(fileSyncRead);
}

async function getToml(slug) {
  const toml = require("@iarna/toml");

  const filePath = path.join(
    POSTS_DIR,
    slug.endsWith(".md") ? slug : `${slug}.md`
  );
  const options = {
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
    delimiters: "+++",
  };
  const fileSyncRead = fs.readFileSync(filePath, "utf-8");
  const data = matter(fileSyncRead, options);
  return data;
}

const normalizeHeadingIds = (content) => {
  if (!content) return content;
  return content.replace(
    /^(#{1,6}[^\n]*?)\s*\{%\s*#([\w-]+)\s*%\}\s*$/gm,
    "$1 {#$2}"
  );
};

async function getMarkdownContent(slug, type = "yaml", config = markdocConfig) {
  const toml = require("@iarna/toml");

  // Ensure slug ends with .md
  const filePath = path.join(
    POSTS_DIR,
    slug.endsWith(".md") ? slug : `${slug}.md`
  );
  const fileSyncRead = fs.readFileSync(filePath, "utf-8");

  let options = {
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "yaml",
    delimiters: "---",
  };
  if (type == "toml") {
    options = {
      engines: {
        toml: toml.parse.bind(toml),
      },
      language: "toml",
      delimiters: "+++",
    };
  }
  const { data: pageData, content: pageContent } = matter(
    fileSyncRead,
    options
  );
  const normalizedContent = normalizeHeadingIds(getHumanContent(pageContent));
  const ast = Markdoc.parse(normalizedContent); //ast is for abstract syntax tree
  const transform = Markdoc.transform(ast, config);
  return {
    content: transform,
    frontMatter: pageData,
  };
}

async function getSectionContent(slug) {
  const toml = require("@iarna/toml");

  // Ensure slug ends with .md
  const filePath = path.join(
    POSTS_DIR,
    slug.endsWith(".md") ? slug : `${slug}.md`
  );
  const fileSyncRead = fs.readFileSync(filePath, "utf-8");

  const options = {
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "yaml",
    delimiters: "---",
  };

  const { data: pageData, content: pageContent } = matter(
    fileSyncRead,
    options
  );

  // Split content on ---outro--- delimiter
  const outroDelimiter = "\n---outro---\n";
  const humanPageContent = getHumanContent(pageContent);
  let introContent = normalizeHeadingIds(humanPageContent);
  let outroContent = null;

  if (humanPageContent.includes(outroDelimiter)) {
    const parts = humanPageContent.split(outroDelimiter);
    introContent = normalizeHeadingIds(parts[0].trim());
    outroContent = normalizeHeadingIds(parts[1]?.trim() || "");
  }

  // Parse and transform intro content
  const introAst = Markdoc.parse(introContent);
  const introTransform = Markdoc.transform(introAst, markdocConfig);

  // Parse and transform outro content if it exists
  let outroTransform = null;
  if (outroContent) {
    const outroAst = Markdoc.parse(outroContent);
    outroTransform = Markdoc.transform(outroAst, markdocConfig);
  }

  return {
    frontMatter: pageData,
    introContent: introTransform,
    outroContent: outroTransform,
  };
}

export { getMarkdownContent, getPostsTree, getYaml, getToml, getSectionContent };
