import { useEffect, useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.id}>
              <strong>{activity.type}</strong>
              <div className="text-muted">
                {activity.durationMinutes} min • {activity.caloriesBurned} kcal
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
