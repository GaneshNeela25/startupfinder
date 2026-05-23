import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Requests.css";

function Requests() {

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] =
    useState([]);

  useEffect(() => {

    axios.get(

      `http://localhost:8080/requests/founder/${currentUser.id}`

    )

    .then((response) => {

      setRequests(response.data);

    })

    .catch((error) => {

      console.log(error);

    });

  }, []);

  const updateStatus = (

    requestId,
    status

  ) => {

    axios.put(

      `http://localhost:8080/requests/${requestId}`,

      {
        status: status
      }

    )

    .then(() => {

      setRequests(

        requests.map((req) => {

          if (req.id === requestId) {

            return {
              ...req,
              status: status
            };

          }

          return req;

        })

      );

    });

  };

  return (

    <div className="requests-page">

      <div className="requests-header">

        <h1>Team Join Requests</h1>

        <p>
          Review applications from
          developers, designers,
          and investors
        </p>

      </div>

      <div className="requests-grid">

        {requests.length === 0 ? (

          <div className="empty-box">

            No requests found

          </div>

        ) : (

          requests.map((req) => (

            <div
              className="request-card"
              key={req.id}
            >

              <div className="profile-circle">

                {req.userName
                  ?.charAt(0)
                  .toUpperCase()}

              </div>

              <h2>{req.userName}</h2>

              <div className="info-row">

                <span className="label">
                  Role
                </span>

                <span className="value">
                  {req.role}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  Status
                </span>

                <span
                  className={
                    req.status === "APPROVED"
                      ? "status approved"
                      : req.status === "REJECTED"
                      ? "status rejected"
                      : "status pending"
                  }
                >
                  {req.status}
                </span>

              </div>

              <div className="message-box">

                <strong>Message</strong>

                <p>
                  {req.message ||
                    "No message provided"}
                </p>

              </div>

              {req.resumeFileName && (

                <a
                  className="resume-btn"
                  href={`http://localhost:8080/uploads/${req.resumeFileName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>

              )}

              {req.status === "PENDING" && (

  <div className="action-buttons">

    <button
      className="approve-btn"
      onClick={() =>
        updateStatus(
          req.id,
          "APPROVED"
        )
      }
    >
      Approve
    </button>

    <button
      className="reject-btn"
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

          ))

        )}

      </div>

    </div>
  );
}

export default Requests;