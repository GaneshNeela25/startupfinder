import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function Profile() {

  const user =
    JSON.parse(localStorage.getItem("user"));

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

    <div className="profile-page">

      <div className="profile-card">

        <div className="avatar">
          {user.name.charAt(0)}
        </div>

        <h1>{user.name}</h1>

        <p>{user.email}</p>

        <p>{user.role}</p>

        <p>{user.skills}</p>

      </div>

      <div className="request-section">

        <h2>My Team Requests</h2>

        <div className="request-grid">

          {requests.map((req) => (

            <div
              key={req.id}
              className="request-card"
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

    </div>
  );
}

export default Profile;