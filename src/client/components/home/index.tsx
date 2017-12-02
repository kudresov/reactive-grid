import * as React from 'react';
import FrontBackendSection from './frontend-backend-section/frontend-backend-section';
import TechSection from './tech-section/tech-section';
import GithubLoadable from '../github/github-container';
import { Route } from 'react-router';
import { SampleBlogLoadable } from '../blog/sample-blog/sample-blog-loadable';
import { AngularEnvVarLoadable } from '../blog/angular-env-var/angular-env-var-loadable';

const styles = require('./index.css');

class Home extends React.Component {
  componentDidMount() {
    GithubLoadable.preload();
    SampleBlogLoadable.preload();
    AngularEnvVarLoadable.preload();
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>You dream</h1>
          <h2 className={styles.subtitle}>We build</h2>
        </div>
        <img src="../../assets/london-skyline.svg" className={styles.skyline} />
        <FrontBackendSection
          containerStyleName={styles.frontendBackendContainer}
        />
        <TechSection containerStyleName={styles.techSection} />
      </div>
    );
  }
}
export default Home;
