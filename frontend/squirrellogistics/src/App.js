import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SupportLayout from './pages/Support/SupportLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/support/*" element={<SupportLayout />} />
        <Route path="*" element={<Navigate to="/support" replace />} />
      </Routes>
    </Router>
  );
}

export default App;