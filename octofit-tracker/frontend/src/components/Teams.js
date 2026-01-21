import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <div className="container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading teams...</span>
      </div>
      <p className="mt-2">Loading teams...</p>
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
      <h1 className="mb-4">👥 Teams</h1>
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No teams found. Create your first team!
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{team.description || 'No description provided'}</p>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-0">
                        <small className="text-muted">Members</small>
                        <br />
                        <span className="badge badge-primary">{team.member_count || 0}</span>
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-0">
                        <small className="text-muted">Created</small>
                        <br />
                        <small>{team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm w-100">View Team</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
