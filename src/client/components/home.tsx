import * as React from 'react';
import TechLogo from './tech-logo';
const styles = require('./home.css');

const Home: React.SFC = () => (
  <div>
    <h1 className={styles.title}>Tech</h1>
    <div className={styles.container}>
      <TechLogo imgSrc="../assets/react-logo.svg" logoName="React" />
      <TechLogo imgSrc="../assets/redux.svg" logoName="Redux" />
      <TechLogo imgSrc="../assets/preact.png" logoName="Preact" />
    </div>
  </div>
);

export default Home;
