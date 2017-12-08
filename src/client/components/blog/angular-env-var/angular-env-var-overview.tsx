import * as React from 'react';
import { SFC } from 'react';
import { Link } from 'react-router-dom';
const styles = require('../blog-item-overview.css');

const AngularEnvVarOverview: SFC = () => (
  <Link className={styles.link} to="blog/a-better-way-to-inject-environmental-variables-in-angular">
    <div className={styles.itemContainer}>
      <p className={styles.date}>19 Sep 2015</p>
      <h1 className={styles.title}>A better way to inject environmental variables in angular</h1>
      <h2 className={styles.summary}>Have you experience problems passing your enviromental variable from you express server to your angular client? I will go over few approaches and outline their advantages and disadvantages</h2>
    </div>
  </Link>
);

export default AngularEnvVarOverview;