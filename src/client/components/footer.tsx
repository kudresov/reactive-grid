import * as React from 'react';
const styles = require('./footer.css');

interface Props {
  readonly containerStyleName?: string;
}

const Footer: React.SFC<Props> = ({ containerStyleName }) => (
  <div className={`${containerStyleName} ${styles.container}`}>
    <p>Created with ♥ by Reactive Grid Ltd</p>
    <p>Copyright 2017 • All Rights Reserved</p>
  </div>
);

export default Footer;
