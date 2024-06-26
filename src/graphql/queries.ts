// mutations for simplified model

import { gql } from 'graphql-tag';

export const listTeams = gql`
  query ListTeams($filter: ModelTeamFilterInput) {
    listTeams(filter: $filter) {
      items {
        id
        name
        currentPlayers
      }
    }
  }
`;



// Commented out mutations below
// import { gql } from 'graphql-tag';

// export const getCommonPlayers = gql`
//   query GetCommonPlayers($team1: String!, $team2: String!) {
//     getCommonPlayers(team1: $team1, team2: $team2) {
//       id
//       name
//       position
//       teamID
//     }
//   }
// `;

// export const listSearches = gql`
//   query ListSearches($filter: ModelSearchFilterInput) {
//     listSearches(filter: $filter) {
//       items {
//         searchId: id
//         team1
//         team2
//         timestamp
//       }
//     }
//   }
// `;
