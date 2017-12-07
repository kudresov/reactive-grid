import * as React from 'react';
import { NavLink, Route } from 'react-router-dom';
import routes from '../../shared/routes';
import { BlogItems } from './blog/blog-items';
import SampleBlogOverview from './blog/sample-blog/sample-blog-overview';
import SampleBlog from './blog/sample-blog/sample-blog';
import AngularEnvVarOverview from './blog/angular-env-var/angular-env-var-overview';
const styles = require('./blog.css');

const Blog: React.SFC = () => (
  <div className={styles.container}>
    <BlogItems style={styles.blogItems}>
      <SampleBlogOverview />
      <AngularEnvVarOverview />
    </BlogItems>
  </div>
);

export default Blog;
