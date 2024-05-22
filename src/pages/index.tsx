import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

// Define the Home component
export default function Home() {
  const [team1, setTeam1] = useState<string>('');
  const [team2, setTeam2] = useState<string>('');

  // Handler for input changes
  const handleInputChange = (setTeam: React.Dispatch<React.SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTeam(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Football Team Comparison</h1>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Team 1</label>
          <input
            type="text"
            value={team1}
            onChange={handleInputChange(setTeam1)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Team 2</label>
          <input
            type="text"
            value={team2}
            onChange={handleInputChange(setTeam2)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <Link href={`/compare?team1=${team1}&team2=${team2}`}>
          <a className="px-4 py-2 bg-blue-500 text-white rounded-lg">Compare</a>
        </Link>
      </form>
    </div>
  );
}
