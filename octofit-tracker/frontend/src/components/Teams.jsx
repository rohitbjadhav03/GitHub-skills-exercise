import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.id}>
              <strong>{team.name}</strong>
              <div className="text-muted">{team.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
