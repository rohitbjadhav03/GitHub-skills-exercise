import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/leaderboard`);
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
