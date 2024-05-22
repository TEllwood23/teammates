// src/pages/compare.tsx
import { useEffect, useState } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { fetchComparisonData, fetchPreviousSearches } from '../utils/api';

export default function Compare() {
  const router = useRouter();
  const { team1, team2 } = router.query;
  const [commonPlayers, setCommonPlayers] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    const fetchPreviousSearches = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.username;
        const result = await fetchPreviousSearches(userId);
        setPreviousSearches(result);
      } catch (error) {
        console.log('User not logged in');
      }
    };

    const fetchData = async () => {
      const result = await fetchComparisonData(team1 as string, team2 as string);
      setCommonPlayers(result);
    };

    fetchPreviousSearches();
    if (team1 && team2) {
      fetchData();
    }
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
            <li key={search.searchId}>{search.team1} vs {search.team2} - {search.timestamp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
