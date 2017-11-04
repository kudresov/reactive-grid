import * as React from 'react';
import TechLogo from './tech-logo';
import TechSection from './tech-section';
import FrontBackendSection from './frontend-backend-section/frontend-backend-section';
import GithubLoadable from './../github-container';
const styles = require('./index.css');

class Home extends React.Component {
  componentDidMount() {
    GithubLoadable.preload();
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
