import fs from "fs";
import { glob } from "glob";
import path from "path";
import matter from "gray-matter";

// import {toml} from 'toml';
import Markdoc from "@markdoc/markdoc";
import { markdocConfig } from "../markdocConfig";
const ARTICLES_PATH = "/app/content";
const POSTS_DIR = path.join(process.cwd(), ARTICLES_PATH);

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

async function getMarkdownContent(slug, type = "yaml") {
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
  const ast = Markdoc.parse(pageContent); //ast is for abstract syntax tree
  const transform = Markdoc.transform(ast, markdocConfig);
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
  let introContent = pageContent;
  let outroContent = null;

  if (pageContent.includes(outroDelimiter)) {
    const parts = pageContent.split(outroDelimiter);
    introContent = parts[0].trim();
    outroContent = parts[1]?.trim() || null;
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
