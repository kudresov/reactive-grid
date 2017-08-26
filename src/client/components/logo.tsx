import * as React from 'react';
import { CSSProperties } from 'react';
const styles = require('./logo.css');

// const styles = {
//   logo: {
//     fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
//     color: 'rgb(146, 146, 146)',
//     fontWeight: 300
//   } as CSSProperties,
//   reactive: {
//     color: '#6A6A6A',
//     fontWeight: 'bold'
//   } as CSSProperties
// };

const Logo: React.SFC = () =>
  <h2 className={styles.logo}>
    <b className={styles.reactive}>Reactive</b>Grid
  </h2>;

export default Logo;
