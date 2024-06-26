import { useEffect, useState } from 'react';
import { API, Auth } from 'aws-amplify';
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
  id: string;
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
        const result = await API.graphql({
          query: listSearches,
          variables: { filter: { userID: { eq: userId } } }
        }) as { data: { listSearches: { items: Search[] } } };
        setPreviousSearches(result.data.listSearches.items);
      } catch (error) {
        console.log('User not logged in', error);
      }
    };

    const fetchData = async () => {
      if (team1 && team2) {
        try {
          const result = await API.graphql({
            query: getCommonPlayers,
            variables: { team1: team1 as string, team2: team2 as string }
          }) as { data: { getCommonPlayers: Player[] } };
          setCommonPlayers(result.data.getCommonPlayers);

          // Save the search to the user's search history
          const user = await Auth.currentAuthenticatedUser();
          const userId = user.username;
          await API.graphql({
            query: createSearch,
            variables: {
              input: {
                userID: userId,
                team1: team1 as string,
                team2: team2 as string,
                timestamp: new Date().toISOString(),
                commonPlayers: result.data.getCommonPlayers.map((player: Player) => player.id)
              }
            }
          });
        } catch (error) {
          console.error('Error fetching common players', error);
        }
      }
    };

    fetchPreviousSearches();
    fetchData();
  }, [team1, team2]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Common Players</h1>
      {commonPlayers.length > 0 ? (
        <ul>
          {commonPlayers.map(player => (
            <li key={player.id}>{player.name} ({player.position})</li>
          ))}
        </ul>
      ) : (
        <p>No common players found.</p>
      )}
      <div>
        <h2 className="text-xl font-bold">Previous Searches</h2>
        <ul>
          {previousSearches.map(search => (
            <li key={search.id}>{search.team1} vs {search.team2} - {new Date(search.timestamp).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
