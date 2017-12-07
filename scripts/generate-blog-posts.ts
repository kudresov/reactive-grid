#!/usr/bin/env ts-node
import * as fs from 'fs';
import { compose, dissoc } from 'ramda';
import * as prettier from 'prettier';
import { format } from 'date-fns';
import { toMarkdown } from './markdown-renderer';
import { BLOG_OUTPUT_FOLDER_PATH } from './blog-config';
import { getBlogData } from './blog-data-reader';

type Config = {
  [key: string]: string;
};

const parseBlogItem = (blogText: string) => toMarkdown(blogText);

const applyTemplate = (template: string, config: Config) => {
  const keys = Object.keys(config);
  if (keys.length === 0) {
    return template;
  }
  const key = keys.pop();
  const regex = new RegExp(`{{${key}}}`, 'g');
  const newTemplate = template.replace(regex, config[key]);
  return applyTemplate(newTemplate, dissoc(key, config));
};

const applyLoadableTemplate = (
  template: string,
  name: string,
  componentName: string
) =>
  template
    .replace(/{{fileName}}/g, name)
    .replace(/{{componentName}}/g, componentName);

const getBlog = (template: string, config: Config) =>
  compose(
    prettier.format,
    (content: string) => applyTemplate(template, { ...config, content }),
    toMarkdown
  );

const createFolder = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

getBlogData().forEach(blogData => {
  const {
    config: { fileName, date, title, summary, componentName, path },
    blogContent,
    overviewTemplate,
    loadableTemplate,
    blogTemplate
  } = blogData;

  const filesPath = `${BLOG_OUTPUT_FOLDER_PATH}/${fileName}`;
  createFolder(filesPath);
  debugger;

  const blog = getBlog(blogTemplate, { componentName })(blogData.blogContent);
  const blogOverview = applyTemplate(overviewTemplate, {
    date: format(date, 'DD MMM YYYY'),
    title,
    summary,
    componentName: componentName + 'Overview',
    path
  });

  const loadable = applyTemplate(loadableTemplate, {
    fileName,
    componentName: componentName + 'Loadable'
  });

  const blogOutputPath = `${filesPath}/${fileName}.tsx`;
  const overviewComponentPath = `${filesPath}/${fileName}-overview.tsx`;
  const loadablePath = `${filesPath}/${fileName}-loadable.tsx`;

  fs.writeFileSync(blogOutputPath, blog);
  fs.writeFileSync(overviewComponentPath, blogOverview);
  fs.writeFileSync(loadablePath, loadable);
});
