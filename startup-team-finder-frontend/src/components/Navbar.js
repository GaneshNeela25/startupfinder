import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (

    <nav className="navbar">

      <h2>Startup Team Finder</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/teams">Teams</Link>

        <Link to="/profile">Profile</Link>

        <Link to="/matches">Matches</Link>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;