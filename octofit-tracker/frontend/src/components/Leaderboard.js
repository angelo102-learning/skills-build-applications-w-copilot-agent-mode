import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading leaderboard...</span>
      </div>
      <p className="mt-2">Loading leaderboard...</p>
    </div>
  );
  if (error) return (
    <div className="container">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="mb-4">🏆 Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leaderboard data found yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{width: '80px'}}>
                  <strong>Rank</strong>
                </th>
                <th>
                  <strong>User</strong>
                </th>
                <th style={{width: '120px'}}>
                  <strong>Points</strong>
                </th>
                <th style={{width: '120px'}}>
                  <strong>Workouts</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                let badgeClass = 'badge-primary';
                let medalIcon = '🥇';
                
                if (rank === 1) {
                  badgeClass = 'badge-primary';
                  medalIcon = '🥇';
                } else if (rank === 2) {
                  badgeClass = 'badge-secondary';
                  medalIcon = '🥈';
                } else if (rank === 3) {
                  badgeClass = 'badge-warning';
                  medalIcon = '🥉';
                }
                
                return (
                  <tr key={entry.id || index}>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {medalIcon} #{rank}
                      </span>
                    </td>
                    <td>
                      <strong>{entry.user_name || entry.username || entry.name || 'Unknown'}</strong>
                    </td>
                    <td>
                      <strong>{entry.points || entry.score || 0}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{entry.workout_count || entry.workouts || 0}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
