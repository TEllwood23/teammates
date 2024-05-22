import { gql } from 'graphql-tag';

export const createSearch = gql`
  mutation CreateSearch($input: CreateSearchInput!) {
    createSearch(input: $input) {
      id
      userID
      team1
      team2
      timestamp
      commonPlayers {
        items {
          id
          name
        }
      }
    }
  }
`;
