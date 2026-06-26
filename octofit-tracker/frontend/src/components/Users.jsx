import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.id}>
              <strong>{user.profile?.displayName || user.username}</strong>
              <div className="text-muted">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
