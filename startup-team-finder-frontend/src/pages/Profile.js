import React from "react";
import "./Profile.css";

function Profile() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">

          {user.name.charAt(0)}

        </div>

        <h1>{user.name}</h1>

        <p>{user.email}</p>

        <div className="profile-details">

          <div className="detail-box">

            <h3>Role</h3>

            <p>{user.role}</p>

          </div>

          <div className="detail-box">

            <h3>Skills</h3>

            <p>{user.skills}</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;