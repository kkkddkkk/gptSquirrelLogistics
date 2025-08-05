import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // 경로 수정

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;