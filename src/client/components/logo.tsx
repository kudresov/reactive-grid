import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./logo.css');

const Logo: React.SFC = () => (
  <h2>
    <Link to="/" className={styles.logo}>
      <b className={styles.reactive}>Reactive</b>Grid!
    </Link>
  </h2>
);

export default Logo;
