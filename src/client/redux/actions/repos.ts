import { replace } from 'react-router-redux';
import routes from '../../../shared/routes';
import * as queryString from 'query-string';

// TODO type the state
export const createGetNextRepos = (after: string) => (dispatch, getState) => {
  const location = getState().routing.location;
  const currentQuery = queryString.parse(location.search);
  return dispatch(
    replace({
      pathname: routes.github,
      search: queryString.stringify({
        ...currentQuery,
        githubPageAfter: after,
        githubPageBefore: undefined
      })
    })
  );
};

export const createGetPreviousRepos = (before: string) => (
  dispatch,
  getState
) => {
  const location = getState().routing.location;
  const currentQuery = queryString.parse(location.search);
  return dispatch(
    replace({
      pathname: routes.github,
      search: queryString.stringify({
        ...currentQuery,
        githubPageBefore: before,
        githubPageAfter: undefined
      })
    })
  );
};

export const createGetNextStars = (after: string) => (dispatch, getState) => {
  const location = getState().routing.location;
  const currentQuery = queryString.parse(location.search);
  return dispatch(
    replace({
      pathname: routes.github,
      search: queryString.stringify({
        ...currentQuery,
        githubStarsPageAfter: after,
        githubStarsPageBefore: undefined
      })
    })
  );
};

export const createGetPreviousStars = (before: string) => (
  dispatch,
  getState
) => {
  const location = getState().routing.location;
  const currentQuery = queryString.parse(location.search);
  return dispatch(
    replace({
      pathname: routes.github,
      search: queryString.stringify({
        ...currentQuery,
        githubStarsPageBefore: before,
        githubStarsPageAfter: undefined
      })
    })
  );
};
