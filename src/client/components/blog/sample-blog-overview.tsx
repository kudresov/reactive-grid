import * as React from 'react';
const styles = require('./blog-item-overview.css');

export const SampleBlogOverview: React.SFC = () => (
  <div>
    <p className={styles.date}>12 Aug 2016</p>
    <h1 className={styles.title}>Testing Reselect</h1>
    <p className={styles.summary}>
      If you are developing something which is slightly more complicated than
      ‘hello world’ you should have multiple environments like: develop,
      staging, production. Depending on the environment you would use different
      resource
    </p>
  </div>
);
