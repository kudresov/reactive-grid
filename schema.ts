/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type StarredReposQueryVariables = {
  reposCount?: number | null,
};

export type StarredReposQuery = {
  // The currently authenticated user.
  viewer:  {
    // Repositories the user has starred.
    starredRepositories:  {
      // A list of nodes.
      nodes:  Array< {
        // The name of the repository.
        name: string,
      } | null > | null,
    },
  },
};

export type GetLastReposQueryVariables = {
  reposCount?: number | null,
};

export type GetLastReposQuery = {
  // The currently authenticated user.
  viewer:  {
    // The user's public profile name.
    name: string | null,
    // A list of repositories that the user owns.
    repositories:  {
      // A list of nodes.
      nodes:  Array< {
        // The name of the repository.
        name: string,
      } | null > | null,
    },
  },
};
/* tslint:enable */
