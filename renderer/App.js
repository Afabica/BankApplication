import React from "react";
import { BrowserRouter as Router, Route, Routers } from "react-router-dom";
import Home from "./components/HomePage.js";
import Dashboard from "./components/DashBoardPage.js";
import Registration from "./components/RegistrationPage.js";

const App = () => {
  return (
    <Router>
      <div>
        <Routers>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<Registration />} />
        </Routers>
      </div>
    </Router>
  );
};

export default App;
