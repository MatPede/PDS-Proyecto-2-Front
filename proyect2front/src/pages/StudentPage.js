import React from 'react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  return (
    <div>
      <h1>Student Page</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default StudentPage;