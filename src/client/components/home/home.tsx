import * as React from 'react';
import TechLogo from './tech-logo';
import TechSection from './tech-section';
const styles = require('./home.css');

const Home: React.SFC = () => (
  <div>
    <div className={styles.header}>
      <h1>You dream</h1>
      <h2>We build</h2>
    </div>
    <img src="../../assets/london-skyline.svg" className={styles.skyline} />
    <div className={styles.backendFrontendContainer}>
      <div className={styles.section}>
        <h1>Frontend</h1>
        <p className={styles.subSection}>
          UX research to a first concept to MVP and to the final product. We can
          build and help you along the whole journey.
        </p>
      </div>
      <div className={styles.section}>
        <h1>Backend</h1>
        <p className={styles.subSection}>
          Migrating from legacy system or building a new one. Splitting you
          monolith or building on a new high performance API. We will build,
          deliver, setup the infrastructure and will help along the way.
        </p>
      </div>
    </div>
    <h1 className={styles.title}>Tech</h1>
    <TechSection />
  </div>
);

export default Home;
