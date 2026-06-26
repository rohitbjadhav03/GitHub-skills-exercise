import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1 className="display-6">OctoFit Tracker</h1>
          <p className="text-muted">
            Configure VITE_CODESPACE_NAME in .env.local to target your Codespaces backend URL.
          </p>
          <nav className="nav nav-pills flex-wrap gap-2">
            <NavLink className="nav-link" to="/">Users</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
