import * as React from 'react';
import TechLogo from './tech-logo';
const styles = require('./tech-section.css');

interface Props {
  readonly containerStyleName?: string;
}

const TechSection: React.SFC<Props> = ({ containerStyleName }) => (
  <div className={containerStyleName}>
    <h1 className={styles.title}>Tech</h1>
    <div className={styles.container}>
      <TechLogo imgSrc="../../assets/react-logo.svg" logoName="React" />
      <TechLogo imgSrc="../../assets/redux.svg" logoName="Redux" />
      <TechLogo imgSrc="../../assets/preact.png" logoName="Preact" />
    </div>
  </div>
);

export default TechSection;
