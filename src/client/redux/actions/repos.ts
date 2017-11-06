import { replace } from 'react-router-redux';
import routes from '../../../shared/routes';
import * as queryString from 'query-string';

export const createGetNextRepos = (after: string) =>
  replace({
    pathname: routes.github,
    search: queryString.stringify({ githubPageAfter: after })
  });

export const createGetPreviousRepos = (before: string) =>
  replace({
    pathname: routes.github,
    search: queryString.stringify({ githubPageBefore: before })
  });
