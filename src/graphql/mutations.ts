//temporary mutations for simplified model

import { gql } from 'graphql-tag';

export const createTeam = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      currentPlayers
    }
  }
`;




// Mutations commented out for now
// import { gql } from 'graphql-tag';

// export const createSearch = gql`
//   mutation CreateSearch($input: CreateSearchInput!) {
//     createSearch(input: $input) {
//       id
//       userID
//       team1
//       team2
//       timestamp
//       commonPlayers {
//         items {
//           id
//           name
//         }
//       }
//     }
//   }
// `;
