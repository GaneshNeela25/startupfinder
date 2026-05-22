import React from "react";
import Matches from "./pages/Matches";
import SuggestedTeams from "./pages/SuggestedTeams";
import Requests from "./pages/Requests";
import TeamChat from "./pages/TeamChat";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";

function App() {

  const user = localStorage.getItem("user");

  return (

    <BrowserRouter>

      {user && <Navbar />}

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" />
          }
        />

        {/* Login */}

        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Login />
          }
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Teams */}

        <Route
          path="/teams"
          element={
            user ? <Teams /> : <Navigate to="/login" />
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            user ? <Profile /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/matches"
          element={
            user ? <Matches /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/suggested-teams"
          element={
            user
            ? <SuggestedTeams />
            : <Navigate to="/login" />
          }
        />

        <Route
          path="/requests"
          element={
          user
          ? <Requests />
          : <Navigate to="/login" />
          }
        />

        <Route
  path="/team-chat"
  element={
    user
      ? <TeamChat />
      : <Navigate to="/login" />
  }
/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;