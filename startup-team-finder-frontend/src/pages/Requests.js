import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

useEffect(() => {

  axios.get(

    `http://localhost:8080/teams/owner/${currentUser.id}`

  )

  .then((teamResponse) => {

    const founderTeams = teamResponse.data;

    if (founderTeams.length > 0) {

      const teamId = founderTeams[0].id;

      axios.get(

        `http://localhost:8080/requests/${teamId}`

      )

      .then((requestResponse) => {

        setRequests(requestResponse.data);

      });

    }

  });

}, []);

  const updateStatus = (id, status) => {

    axios.put(
      `http://localhost:8080/requests/${id}?status=${status}`
    )

    .then(() => {

      setRequests(

        requests.map((req) =>

          req.id === id
            ? { ...req, status }
            : req
        )
      );
    });
  };

  return (

    <div className="container">

      <h1>Join Requests</h1>

      <div className="card-container">

        {requests.map((req) => (

          <div className="card" key={req.id}>

            <h3>{req.userName}</h3>

            <p>{req.role}</p>

            <p>{req.message}</p>

            <p>
              Status:
              <strong>
                {req.status}
              </strong>
            </p>

            {req.status === "PENDING" && (

              <div>

                <button
                  onClick={() =>
                    updateStatus(
                      req.id,
                      "APPROVED"
                    )
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      req.id,
                      "REJECTED"
                    )
                  }
                >
                  Reject
                </button>

              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Requests;