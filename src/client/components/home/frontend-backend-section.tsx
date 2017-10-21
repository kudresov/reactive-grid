import * as React from 'react';
const styles = require('./frontend-backend-section.css');

interface Props {
  readonly containerStyleName?: string;
}

const FrontBackendSection: React.SFC<Props> = ({ containerStyleName }) => (
  <div className={`${styles.backendFrontendContainer} ${containerStyleName}`}>
    <div className={styles.section}>
      <h2 className={styles.subtitle}>Frontend</h2>
      <p className={styles.subSection}>
        UX research to a first concept to MVP and to the final product. We can
        build and help you along the whole journey.
      </p>
    </div>
    <div className={`${styles.section} ${styles.backendSection}`}>
      <h2 className={styles.subtitle}>Backend</h2>
      <p className={styles.subSection}>
        Migrating from legacy system or building a new one. Splitting you
        monolith or building on a new high performance API. We will build,
        deliver, setup the infrastructure and will help along the way.
      </p>
    </div>
  </div>
);

export default FrontBackendSection;
