import * as React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../shared/routes';
import { SampleBlogOverview } from './blog/sample-blog-overview';

const Blog: React.SFC = () => (
  // <NavLink to={'blog' + routes.blogTestingReselect}>Testing Reselect</NavLink>
  <div>
    <SampleBlogOverview />
  </div>
);

export default Blog;
