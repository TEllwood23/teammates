import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { getCommonPlayers, listSearches } from '../graphql/queries';
import { createSearch } from '../graphql/mutations';

interface Player {
  id: string;
  name: string;
  position: string;
  teamID: string;
}

interface Search {
  searchId: string;
  team1: string;
  team2: string;
  timestamp: string;
}

export default function Compare() {
  const router = useRouter();
  const { team1, team2 } = router.query;
  const [commonPlayers, setCommonPlayers] = useState<Player[]>([]);
  const [previousSearches, setPreviousSearches] = useState<Search[]>([]);

  useEffect(() => {
    const fetchPreviousSearches = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.username;
        const result = await API.graphql(graphqlOperation(listSearches, { filter: { userID: { eq: userId } } })) as any;
        setPreviousSearches(result.data.listSearches.items);
      } catch (error) {
        console.log('User not logged in');
      }
    };

    const fetchData = async () => {
      if (team1 && team2) {
        try {
          const result = await API.graphql(graphqlOperation(getCommonPlayers, { team1: team1 as string, team2: team2 as string })) as any;
          setCommonPlayers(result.data.getCommonPlayers);

          // Save the search to the user's search history
          const user = await Auth.currentAuthenticatedUser();
          const userId = user.username;
          await API.graphql(graphqlOperation(createSearch, {
            input: {
              userID: userId,
              team1: team1 as string,
              team2: team2
