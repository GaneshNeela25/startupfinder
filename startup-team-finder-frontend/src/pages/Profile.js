import React from "react";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="container">

      <h1>User Profile</h1>

      <div className="card">

        <div className="avatar">
            {user.name.charAt(0)}
        </div>

        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <p>{user.role}</p>

        <p>{user.skills}</p>

      </div>

    </div>
  );
}

export default Profile;