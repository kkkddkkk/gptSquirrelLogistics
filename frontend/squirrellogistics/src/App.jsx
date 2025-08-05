import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverProfile from "./pages/Driver/DriverProfile";
import EditProfile from "./pages/Driver/EditProfile";
import EditVehicles from "./pages/Driver/EditVehicles";
import RegisterVehicles from "./pages/Driver/RegisterVehicles";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/driver/profile" element={<DriverProfile />} />
        <Route path="/driver/editprofile" element={<EditProfile />} />
        <Route path="/driver/editvehicles" element={<EditVehicles />} />
        <Route path="/driver/registervehicles" element={<RegisterVehicles />} />
      </Routes>
    </Router>
  );
}

export default App;
