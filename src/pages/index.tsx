import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Football Team Comparison</h1>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Team 1</label>
          <input
            type="text"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Team 2</label>
          <input
            type="text"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <Link href={`/compare?team1=${team1}&team2=${team2}`}>
          <div className="px-4 py-2 bg-blue-500 text-white rounded-lg">Compare</div>
        </Link>
      </form>
    </div>
  );
}
