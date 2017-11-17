import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import * as styles from './header.css';
import Logo from '../logo/logo';
import routes from '../../../shared/routes';
const styles = require('./header.css');

const Header: React.SFC = () => (
  <nav className={styles.nav}>
    <Logo />
    <ul>
      {/* <li className={styles.li}>
        <NavLink
          activeClassName={styles.activeLink}
          className={styles.a}
          to={routes.projects}
        >
          Projects
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink
          activeClassName={styles.activeLink}
          className={styles.a}
          to={routes.about}
        >
          About us
        </NavLink>
      </li> */}
      <li className={styles.li}>
        <NavLink
          activeClassName={styles.activeLink}
          className={styles.a}
          to={routes.blog}
        >
          Blog
        </NavLink>
      </li>
      <li className={styles.li}>
        <NavLink
          activeClassName={styles.activeLink}
          className={styles.a}
          to={routes.github}
        >
          Github
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Header;
