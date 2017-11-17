import * as React from 'react';

import { CSSProperties, SFC } from 'react';

const styles = require('./dots-loader.css');

interface Props {
  readonly style?: string;
}

const DotsLoader: SFC<Props> = ({ style }) => (
  <div className={style}>
    <div className={styles.container}>
      <div className={styles.dot1} />
      <div className={styles.dot2} />
      <div className={styles.dot3} />
    </div>
  </div>
);

export default DotsLoader;
