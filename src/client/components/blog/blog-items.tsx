import * as React from 'react';
const styles = require('./blog-items.css');

interface Props {
  readonly style?: string;
}

export const BlogItems: React.SFC<Props> = ({ children, style }) => (
  <div className={`${styles.container} ${style}`}>
    {React.Children.map(children, child => (
      <div>
        {child}
        <div className={styles.separator} />
      </div>
    ))}
  </div>
);
