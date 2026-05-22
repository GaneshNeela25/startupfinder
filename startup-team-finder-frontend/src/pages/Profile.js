import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] =
  useState([]);

  useEffect(() => {

  axios.get(

    `http://localhost:8080/requests/user/${user.id}`

  )

  .then((response) => {

    setRequests(response.data);

  });

}, []);

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

        <h2>My Team Requests</h2>

{requests.map((req) => (

  <div
    key={req.id}
    className="card"
  >

    <p>
      <strong>Status:</strong>
      {req.status}
    </p>

    <p>
      <strong>Role:</strong>
      {req.role}
    </p>

    <p>
      <strong>Message:</strong>
      {req.message}
    </p>

  </div>

))}

      </div>

    </div>
  );
}

export default Profile;