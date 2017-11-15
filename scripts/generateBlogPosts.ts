import * as fs from 'fs';
import * as marked from 'marked';
import { compose } from 'ramda';
import * as prettier from 'prettier';

const BLOG_FOLDER_PATH = './blog';
const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  return `<h1 className={styles.h${level}}>${text}</h1>`;
};

const blogItemTemplate = fs
  .readFileSync('./blog-item.template')
  .toString('utf-8');

const blogFiles = fs.readdirSync('./blog');
const readFile = filePath =>
  fs.readFileSync(`${BLOG_FOLDER_PATH}/${filePath}`).toString('utf-8');
const parseBlogItem = (blogText: string) => marked(blogText, { renderer });
const wrap = (content: string) => `<div>${content}</div>`;
const applyTemplate = content =>
  blogItemTemplate.replace('{{content}}', content);
const getBlog = compose(
  prettier.format,
  applyTemplate,
  wrap,
  parseBlogItem,
  readFile
);
const blogs = blogFiles.map(getBlog);

blogs.forEach(b => fs.writeFileSync('./blog.tsx', b));

console.log(JSON.stringify(blogs, null, 2));
