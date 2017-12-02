import * as React from 'react';
import { NavLink, Route } from 'react-router-dom';
import routes from '../../shared/routes';
import { BlogItems } from './blog/blog-items';
import SampleBlogOverview from './blog/sample-blog-overview';
import SampleBlog from './blog/sample-blog';
const styles = require('./blog.css');

const Blog: React.SFC = () => (
  <div className={styles.container}>
    <BlogItems style={styles.blogItems}>
      <SampleBlogOverview />
    </BlogItems>
  </div>
);

export default Blog;
