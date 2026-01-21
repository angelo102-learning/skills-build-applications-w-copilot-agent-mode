import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiBaseUrl = `https://${codespaceName}-8000.app.github.dev/api/`;
  
  console.log('React App Initialized');
  console.log('Codespace Name:', codespaceName);
  console.log('API Base URL:', apiBaseUrl);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="bg-light-gradient p-5 rounded">
                  <h1 className="display-4 text-center mb-4">🐙 Welcome to OctoFit Tracker</h1>
                  <p className="lead text-center mb-4">
                    Track your fitness activities, compete with teams, and achieve your goals!
                  </p>
                  <hr className="my-4" />
                  <div className="row mt-4">
                    <div className="col-md-4 text-center mb-3">
                      <h5>📊 Track Activities</h5>
                      <p>Log your workouts and monitor your progress</p>
                    </div>
                    <div className="col-md-4 text-center mb-3">
                      <h5>👥 Join Teams</h5>
                      <p>Compete with teammates and earn points</p>
                    </div>
                    <div className="col-md-4 text-center mb-3">
                      <h5>🏆 Climb Leaderboard</h5>
                      <p>Show your fitness dominance</p>
                    </div>
                  </div>
                  <p className="text-muted text-center mt-4">
                    <small>API Base URL: {apiBaseUrl}</small>
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p>&copy; 2025 OctoFit Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
