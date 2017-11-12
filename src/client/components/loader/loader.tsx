import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./loader.css');

const Loader: React.SFC = () => <div className={styles.loader}>Loading...</div>;

export default Loader;
