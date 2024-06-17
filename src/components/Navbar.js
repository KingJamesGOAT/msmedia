import React, { useState } from "react";

const Navbar = ({ onLogout, onNavigate, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigate = (event) => {
    const moduleName = event.target.getAttribute("data-module");
    onNavigate(moduleName);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = [];
      for (const [module, courseList] of Object.entries(courses)) {
        for (const course of courseList) {
          if (course.name.toLowerCase().includes(query)) {
            results.push({ module, course: course.name });
          }
        }
      }
      setSearchResults(results.slice(0, 3));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (module) => {
    onNavigate(module);
    setSearchQuery("");
    setSearchResults([]);
  };

  const courses = {
    AnaStraMar: [{ name: "AnalysMar" }, { name: "MarkDig2" }],
    BasPratCom: [
      { name: "ComVisuel" },
      { name: "EcrireWeb" },
      { name: "ProdConMé1" },
    ],
    BaScienCo: [
      { name: "BaseProg2" },
      { name: "BaseMath2" },
      { name: "DeDonAInf2" },
    ],
    EvolMetMed: [{ name: "Droit1" }, { name: "EvolMetMed" }],
    GesBudget: [{ name: "GesBudget" }, { name: "PilotFin" }],
    TecWeb: [{ name: "InfraDon1" }, { name: "ProgServ1" }],
  };

  return (
    <div className="navbar">
      <div className="nav-buttons">
        <button
          className="nav-button"
          data-module="AnaStraMar"
          onClick={handleNavigate}
        >
          AnaStraMar
        </button>
        <button
          className="nav-button"
          data-module="BasPratCom"
          onClick={handleNavigate}
        >
          BasPratCom
        </button>
        <button
          className="nav-button"
          data-module="BaScienCo"
          onClick={handleNavigate}
        >
          BaScienCo
        </button>
        <button
          className="nav-button"
          data-module="EvolMetMed"
          onClick={handleNavigate}
        >
          EvolMetMed
        </button>
        <button
          className="nav-button"
          data-module="GesBudget"
          onClick={handleNavigate}
        >
          GesBudget
        </button>
        <button
          className="nav-button"
          data-module="TecWeb"
          onClick={handleNavigate}
        >
          TecWeb
        </button>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search for courses"
            style={{ paddingRight: "40px" }} // Adjust to make room for the icon
          />
          <span className="search-icon">
            <lord-icon
              src="https://cdn.lordicon.com/unukghxb.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
          </span>
          <div
            id="search-results"
            className="search-results"
            aria-live="polite"
          >
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleResultClick(result.module)}
              >
                {result.course}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="user-menu">
        <lord-icon
          src="https://cdn.lordicon.com/bgebyztw.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#f0f0f0"
          style={{ width: "40px", height: "40px" }}
          onClick={() => setShowDropdown(!showDropdown)}
        ></lord-icon>
        {showDropdown && (
          <div className="dropdown-menu">
            <p>{currentUser}</p>
            <button
              onClick={() => alert("Change Password Feature Coming Soon")}
            >
              Change Password
            </button>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
