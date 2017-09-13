import * as React from 'react';
import { Link } from 'react-router-dom';
// import * as styles from './header.css';
import Logo from './logo';
import { CSSProperties } from 'react';
const styles = require('./header.css');

const Header: React.SFC = () => (
  <nav className={styles.nav}>
    <Logo />
    <ul>
      <li className={styles.li}>
        <Link className={styles.a} to="/projects">
          Projects
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.a} to="/blog">
          Blog
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.a} to="/about">
          About us
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
