#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as marked from 'marked';
import { compose } from 'ramda';
import * as prettier from 'prettier';
import { format } from 'date-fns';

const BLOG_TEMPLATE_FOLDER_PATH = './blog';
const BLOG_OUTPUT_FOLDER_PATH = './src/client/components/blog';
const BLOG_ITEM_OVERVIEW_PATH = '/blog-item-overview.template';
const BLOG_ITEM_LOADABLE_PATH = '/blog-item-loadable.template';

const renderer = new marked.Renderer();

const readFile = filePath =>
  fs.readFileSync(`${BLOG_TEMPLATE_FOLDER_PATH}/${filePath}`).toString('utf-8');

const blogItemOverviewTemplate = readFile(BLOG_ITEM_OVERVIEW_PATH);
const blogItemLoadableTemplate = readFile(BLOG_ITEM_LOADABLE_PATH);

renderer.heading = (text, level) =>
  `<h1 className={styles.h${level}}>${text}</h1>`;

renderer.paragraph = text => `<p className={styles.p}>${text}</p>`;
renderer.code = (code, lang) =>
  `<SyntaxHighlighter language='${
    lang
  }' style={tomorrowNight}>{${JSON.stringify(code)}}</SyntaxHighlighter>`;

renderer.image = (href: string) => `<img src="${href}"/>`;

const blogItemTemplate = fs
  .readFileSync('./blog/blog-item.template')
  .toString('utf-8');

const filterMarkdown = (filePaths: string[]) =>
  filePaths.filter(fp => fp.endsWith('.md'));

const files = fs.readdirSync('./blog');
const blogFiles = filterMarkdown(files);

const parseBlogItem = (blogText: string) => marked(blogText, { renderer });

const applyTemplate = (componentName: string) => content =>
  blogItemTemplate
    .replace(/{{content}}/g, content)
    .replace(/{{ComponentName}}/g, componentName);

const applyOverviewTemplate = (
  template: string,
  date: string,
  title: string,
  summary: string,
  componentName: string,
  path: string
) =>
  template
    .replace(/{{date}}/g, date)
    .replace(/{{title}}/g, title)
    .replace(/{{summary}}/g, summary)
    .replace(/{{ComponentName}}/g, componentName)
    .replace(/{{path}}/g, path);

const applyLoadableTemplate = (
  template: string,
  name: string,
  componentName: string
) =>
  template
    .replace(/{{fileName}}/g, name)
    .replace(/{{componentName}}/g, componentName);

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
  const blogPath = blogConfigFile.path;
  const contentOverview = applyOverviewTemplate(
    blogItemOverviewTemplate,
    format(blogConfigFile.date, 'DD MMM YYYY'),
    blogConfigFile.title,
    blogConfigFile.summary,
    blogConfigFile.componentName + 'Overview',
    blogPath
  );
  const loadable = applyLoadableTemplate(
    blogItemLoadableTemplate,
    blogFileName,
    blogConfigFile.componentName + 'Loadable'
  );

  return {
    content: getBlog(blogConfigFile.componentName)(bf),
    contentOverview,
    loadable,
    fileName: blogFileName
  };
});

blogs.forEach(b => {
  const filesPath = `${BLOG_OUTPUT_FOLDER_PATH}/${b.fileName}`;

  if (!fs.existsSync(filesPath)) {
    fs.mkdirSync(filesPath);
  }

  const componentPath = `${filesPath}/${b.fileName}.tsx`;
  const overviewComponentPath = `${filesPath}/${b.fileName}-overview.tsx`;
  const loadablePath = `${filesPath}/${b.fileName}-loadable.tsx`;

  fs.writeFileSync(componentPath, b.content);
  fs.writeFileSync(overviewComponentPath, b.contentOverview);
  fs.writeFileSync(loadablePath, b.loadable);
});
