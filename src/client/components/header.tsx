import * as React from 'react';
import { Link } from 'react-router-dom';
// import * as styles from './header.css';
import Logo from './logo';
import routes from '../../shared/routes';
const styles = require('./header.css');

const Header: React.SFC = () => (
  <nav className={styles.nav}>
    <Logo />
    <ul>
      <li className={styles.li}>
        <Link className={styles.a} to={routes.projects}>
          Projects!
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.a} to={routes.blog}>
          Blog
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.a} to={routes.about}>
          About us
        </Link>
      </li>
      <li className={styles.li}>
        <Link className={styles.a} to={routes.github}>
          Github
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
