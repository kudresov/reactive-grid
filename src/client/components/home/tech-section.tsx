import * as React from 'react';
import TechLogo from './tech-logo';
const styles = require('./tech-section.css');

const TechSection: React.SFC = () => (
  <div className={styles.container}>
    <TechLogo imgSrc="../../assets/react-logo.svg" logoName="React" />
    <TechLogo imgSrc="../../assets/redux.svg" logoName="Redux" />
    <TechLogo imgSrc="../../assets/preact.png" logoName="Preact" />
  </div>
);

export default TechSection;
