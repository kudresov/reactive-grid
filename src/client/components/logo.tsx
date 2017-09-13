import * as React from 'react';
import { CSSProperties } from 'react';
const styles = require('./logo.css');

const Logo: React.SFC = () => (
  <h2 className={styles.logo}>
    <b className={styles.reactive}>Reactive</b>Grid
  </h2>
);

export default Logo;
