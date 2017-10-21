import * as React from 'react';
import TechLogo from './tech-logo';
import TechSection from './tech-section';
import FrontBackendSection from './frontend-backend-section';
const styles = require('./home.css');

const Home: React.SFC = () => (
  <div>
    <div className={styles.header}>
      <h1 className={styles.mainTitle}>You dream</h1>
      <h2 className={styles.subtitle}>We build</h2>
    </div>
    <img src="../../assets/london-skyline.svg" className={styles.skyline} />
    <FrontBackendSection containerStyleName={styles.frontendBackendContainer} />
    <h1 className={styles.title}>Tech</h1>
    <TechSection />
  </div>
);

export default Home;
