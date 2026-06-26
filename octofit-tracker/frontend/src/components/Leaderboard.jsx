import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {leaderboard.map((entry, index) => (
            <li className="list-group-item" key={entry._id || entry.id || `${entry.name}-${index}`}>
              <strong>#{index + 1} {entry.name || entry.user?.profile?.displayName || 'Unknown'}</strong>
              <div className="text-muted">{entry.score || entry.points || '—'} points</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
