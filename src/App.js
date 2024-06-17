import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Module from "./components/Module";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentModule, setCurrentModule] = useState("");
  const [view, setView] = useState("login"); // 'login', 'register', 'app'

  const handleLogin = (username) => {
    setCurrentUser(username);
    setView("app");
  };

  const handleRegister = () => {
    setView("login");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentModule("");
    setView("login");
  };

  const handleNavigate = (moduleName) => {
    setCurrentModule(moduleName);
  };

  const handleSave = () => {
    alert("Data saved successfully!");
  };

  const switchToRegister = () => {
    setView("register");
  };

  const switchToLogin = () => {
    setView("login");
  };

  return (
    <div className="app">
      {view === "login" && (
        <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
      )}
      {view === "register" && (
        <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
      )}
      {view === "app" && (
        <div className="app-container">
          <Navbar
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
          <Module moduleName={currentModule} />
          <button id="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
