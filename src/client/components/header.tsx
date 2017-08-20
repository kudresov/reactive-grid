import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.SFC = () =>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contacts">Contact Us!</Link>
    </li>
  </ul>;

export default Header;
