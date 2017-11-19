import * as React from 'react';
import { SFC } from 'react';
import { Link } from 'react-router-dom';
const styles = require('./blog-item-overview.css');

export const SampleBlogOverview: SFC = () => (
  <Link className={styles.link} to="blog/sample-blog">
    <div>
      <p className={styles.date}>08 Nov 2017</p>
      <h1 className={styles.title}>Sample Blog Title</h1>
      <h2 className={styles.summary}>If you are developing something which is slightly more complicated than ‘hello world’ you should have multiple environments like: develop, staging, production. Depending on the environment you would use different resource</h2>
    </div>
  </Link>
);
