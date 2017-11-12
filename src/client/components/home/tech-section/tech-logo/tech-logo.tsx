import * as React from 'react';
const styles = require('./tech-logo.css');

interface Props {
  readonly imgSrc: string;
  readonly logoName: string;
}

const TechLogo: React.SFC<Props> = props => (
  <div className={styles.container}>
    <img className={styles.logo} src={props.imgSrc} alt={props.logoName} />
    <p>{props.logoName}</p>
  </div>
);

export default TechLogo;
