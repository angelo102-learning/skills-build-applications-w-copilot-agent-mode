import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return (
    <div className="container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading workouts...</span>
      </div>
      <p className="mt-2">Loading workouts...</p>
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
      <h1 className="mb-4">💪 Workouts</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workouts found. Create your first workout!
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => {
            let difficultyClass = 'bg-info';
            if (workout.difficulty) {
              const difficulty = workout.difficulty.toLowerCase();
              if (difficulty === 'easy') difficultyClass = 'bg-success';
              else if (difficulty === 'medium') difficultyClass = 'bg-warning';
              else if (difficulty === 'hard') difficultyClass = 'bg-danger';
            }
            
            return (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">{workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{workout.description || 'No description provided'}</p>
                    <hr />
                    <div className="mb-3">
                      {workout.difficulty && (
                        <p className="mb-2">
                          <small className="text-muted">Difficulty</small>
                          <br />
                          <span className={`badge ${difficultyClass}`}>{workout.difficulty}</span>
                        </p>
                      )}
                      {workout.duration && (
                        <p className="mb-2">
                          <small className="text-muted">Duration</small>
                          <br />
                          <span className="badge bg-primary">{workout.duration} mins</span>
                        </p>
                      )}
                      {workout.exercises && (
                        <p className="mb-0">
                          <small className="text-muted">Exercises</small>
                          <br />
                          <span className="badge bg-secondary">{workout.exercises}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-light">
                    <small className="text-muted">
                      Created: {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'N/A'}
                    </small>
                  </div>
                  <div className="card-footer bg-light">
                    <button className="btn btn-primary btn-sm w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Workouts;
