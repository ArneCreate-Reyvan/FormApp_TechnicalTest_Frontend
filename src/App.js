import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Form from './components/Form'; // Assuming this is the form component
import SubmissionsList from './components/SubmissionsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} /> {/* The form route */}
          <Route path="/submissions" element={<SubmissionsList />} /> {/* The submissions page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
