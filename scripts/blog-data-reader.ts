import {
  BLOG_TEMPLATE_FOLDER_PATH,
  BLOG_ITEM_OVERVIEW_PATH,
  BLOG_ITEM_LOADABLE_PATH
} from './blog-config';
import * as fs from 'fs';
import { BLOG_ITEM_PATH } from './blog-config';

type BlogConfig = {
  readonly componentName: string;
  readonly title: string;
  readonly date: string;
  readonly path: string;
  readonly summary: string;
  readonly fileName: string;
};

type BlogData = {
  readonly config: BlogConfig;
  readonly blogContent: string;
  readonly blogTemplate: string;
  readonly overviewTemplate: string;
  readonly loadableTemplate: string;
};

const readFile = filePath =>
  fs.readFileSync(`${BLOG_TEMPLATE_FOLDER_PATH}/${filePath}`).toString('utf-8');

const overviewTemplate = readFile(BLOG_ITEM_OVERVIEW_PATH);
const loadableTemplate = readFile(BLOG_ITEM_LOADABLE_PATH);
const blogTemplate = readFile(BLOG_ITEM_PATH);

const blogItemTemplate = fs
  .readFileSync('./blog/blog-item.template')
  .toString('utf-8');

const filterMarkdown = (filePaths: string[]) =>
  filePaths.filter(fp => fp.endsWith('.md'));

const files = fs.readdirSync('./blog');
const blogFiles = filterMarkdown(files);

export const getBlogData = (): BlogData[] =>
  blogFiles.map(filePath => {
    const blogContent = readFile(filePath);
    const fileName = filePath.split('.md')[0];
    const blogConfigFileName = fileName + '.json';
    const blogConfig: BlogConfig = JSON.parse(readFile(blogConfigFileName));
    return {
      config: { ...blogConfig, fileName },
      blogContent,
      overviewTemplate,
      loadableTemplate,
      blogTemplate
    };
  });
