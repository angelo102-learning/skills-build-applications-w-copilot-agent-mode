import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <div className="container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading activities...</span>
      </div>
      <p className="mt-2">Loading activities...</p>
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
      <h1 className="mb-4">📊 Activities</h1>
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No activities found. Create your first activity!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Description</th>
                <th>Duration (mins)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>{activity.description || 'N/A'}</td>
                  <td>{activity.duration ? activity.duration : 'N/A'}</td>
                  <td>{activity.calories ? <span className="badge badge-primary">{activity.calories}</span> : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
