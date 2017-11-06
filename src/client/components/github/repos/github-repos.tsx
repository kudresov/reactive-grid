import * as React from 'react';
import { Repo } from '../../../../typings';
import Loader from '../../loader/loader';

const styles = require('../github-section.css');

interface Props {
  readonly loading: boolean;
  readonly repos: Repo[];
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly getNext: () => void;
  readonly getPrevious: () => void;
  readonly before?: string;
  readonly after?: string;
}

const GitHubRepos: React.SFC<Partial<Props>> = ({
  loading,
  repos,
  hasNext,
  hasPrevious,
  getNext,
  getPrevious,
  before,
  after
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <img className={styles.icon} src="../../assets/repo.svg" />
        <h2 className={styles.header}>GitHub!</h2>
      </div>
      <div className={styles.listContainer}>
        {loading ? (
          <Loader />
        ) : (
          <ul className={styles.list}>
            {repos.map(n => <li key={n.name}>{n.name}</li>)}
          </ul>
        )}
      </div>

      <a
        className={hasPrevious ? styles.link : styles.linkDisabled}
        onClick={getPrevious}
      >
        newer
      </a>
      <span className={styles.separator}> | </span>
      <a
        className={hasNext ? styles.link : styles.linkDisabled}
        onClick={() => getNext()}
      >
        older
      </a>
    </div>
  );
};

export default GitHubRepos;
