#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as marked from 'marked';
import { compose } from 'ramda';
import * as prettier from 'prettier';
import { format } from 'date-fns';

const BLOG_FOLDER_PATH = './blog';
const BLOG_OUTPUT_FOLDER_PATH = './src/client/components/blog/';
const BLOG_ITEM_OVERVIEW_PATH = '/blog-item-overview.template';

const renderer = new marked.Renderer();

renderer.heading = (text, level) =>
  `<h1 className={styles.h${level}}>${text}</h1>`;

renderer.paragraph = text => `<p className={styles.p}>${text}</p>`;

const blogItemTemplate = fs
  .readFileSync('./blog/blog-item.template')
  .toString('utf-8');

const filterMarkdown = (filePaths: string[]) =>
  filePaths.filter(fp => fp.endsWith('.md'));

const files = fs.readdirSync('./blog');
const blogFiles = filterMarkdown(files);

const readFile = filePath =>
  fs.readFileSync(`${BLOG_FOLDER_PATH}/${filePath}`).toString('utf-8');
const parseBlogItem = (blogText: string) => marked(blogText, { renderer });

const applyTemplate = (componentName: string) => content =>
  blogItemTemplate
    .replace('{{content}}', content)
    .replace('{{ComponentName}}', componentName);

const applyOverviewTemplate = (
  template: string,
  date: string,
  title: string,
  summary: string,
  componentName: string,
  path: string
) =>
  template
    .replace('{{date}}', date)
    .replace('{{title}}', title)
    .replace('{{summary}}', summary)
    .replace('{{ComponentName}}', componentName)
    .replace('{{path}}', path);

const getBlog = (componentName: string) =>
  compose(
    prettier.format,
    applyTemplate(componentName),
    parseBlogItem,
    readFile
  );

const blogs = blogFiles.map(bf => {
  const blogFileName = bf.split('.md')[0];
  const blogConfigFileName = blogFileName + '.json';
  const blogConfigFile = JSON.parse(readFile(blogConfigFileName));
  const blogItemOverview = readFile(BLOG_ITEM_OVERVIEW_PATH);
  const blogPath = blogConfigFile.path;
  const contentOverview = applyOverviewTemplate(
    blogItemOverview,
    format(blogConfigFile.date, 'DD MMM YYYY'),
    blogConfigFile.title,
    blogConfigFile.summary,
    blogConfigFile.componentName + 'Overview',
    blogPath
  );

  return {
    content: getBlog(blogConfigFile.componentName)(bf),
    contentOverview,
    fileName: blogFileName
  };
});

blogs.forEach(b => {
  fs.writeFileSync(BLOG_OUTPUT_FOLDER_PATH + b.fileName + '.tsx', b.content);
  fs.writeFileSync(
    BLOG_OUTPUT_FOLDER_PATH + b.fileName + '-overview.tsx',
    b.contentOverview
  );
});
