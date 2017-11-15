import * as fs from 'fs';
import * as marked from 'marked';
import { compose } from 'ramda';
import * as prettier from 'prettier';

const BLOG_FOLDER_PATH = './blog';
const BLOG_OUTPUT_FOLDER_PATH = './src/client/components/blog/';
const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  return `<h1 className={styles.h${level}}>${text}</h1>`;
};

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
const wrap = (content: string) => `<div>${content}</div>`;

const applyTemplate = (componentName: string) => content =>
  blogItemTemplate
    .replace('{{content}}', content)
    .replace('{{ComponentName}}', componentName);
const getBlog = (componentName: string) =>
  compose(
    prettier.format,
    applyTemplate(componentName),
    wrap,
    parseBlogItem,
    readFile
  );

const blogs = blogFiles.map(bf => {
  const blogFileName = bf.split('.md')[0];
  const blogConfigFileName = blogFileName + '.json';
  const blogConfigFile = JSON.parse(readFile(blogConfigFileName));
  return {
    content: getBlog(blogConfigFile.componentName)(bf),
    fileName: blogFileName
  };
});

blogs.forEach(b =>
  fs.writeFileSync(BLOG_OUTPUT_FOLDER_PATH + b.fileName + '.tsx', b.content)
);
