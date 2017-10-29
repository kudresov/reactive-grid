/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type GetLastReposQueryVariables = {
  last?: number | null,
  first?: number | null,
  before?: string | null,
  after?: string | null,
};

export type GetLastReposQuery = {
  // The currently authenticated user.
  viewer:  {
    // The user's public profile name.
    name: string | null,
    // A list of repositories that the user owns.
    repositories:  {
      // A list of edges.
      edges:  Array< {
        // A cursor for use in pagination.
        cursor: string,
        // The item at the end of the edge.
        node:  {
          // The name of the repository.
          name: string,
        } | null,
      } | null > | null,
      // Information to aid in pagination.
      pageInfo:  {
        // When paginating backwards, are there more items?
        hasPreviousPage: boolean,
        // When paginating forwards, are there more items?
        hasNextPage: boolean,
        // When paginating forwards, the cursor to continue.
        endCursor: string | null,
        // When paginating backwards, the cursor to continue.
        startCursor: string | null,
      },
    },
  },
};

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
/* tslint:enable */
