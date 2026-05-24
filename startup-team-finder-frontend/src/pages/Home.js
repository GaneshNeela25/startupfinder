import React from "react";
import "./Home.css";

function Home() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div className="home-page">

      <div className="hero-section">

        <div className="hero-left">

          <h1>
            Welcome to
            <span> BuildNest</span>
          </h1>

          <p>
            Connect with founders,
            developers, designers,
            and investors to build
            amazing startups together.
          </p>

          <div className="hero-cards">

            <div className="hero-card">
              <h3>Teams</h3>

              <h5>
                Create and manage
                startup teams
              </h5>
            </div>

            <div className="hero-card">
              <h3>Networking</h3>

              <h5>
                Connect with skilled
                professionals
              </h5>
            </div>

            <div className="hero-card">
              <h3>Collaboration</h3>
               
              <h5>
                Chat and work together
                in real-time
              </h5>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="profile-box">

            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <h2>{user.name}</h2>

            <p>{user.role}</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Home;