import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {

  const user =
  JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (

    <nav className="navbar">

      <div className="logo-section">

        <img
          src={logo}
          alt="BuildNest"
          className="logo"
        />

        <h2 className="logo-text">
          BuildNest
        </h2>

      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/profile">Profile</Link>

        <Link to="/team-chat">Team Chat</Link>

        <Link to="/suggested-teams">Suggested Teams</Link>

        {user?.role?.includes("FOUNDER") && (

  <>
    <Link to="/teams">
      Teams
    </Link>

    <Link to="/requests">
      Requests
    </Link>
  </>

)}

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;