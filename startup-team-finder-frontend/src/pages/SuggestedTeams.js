import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function SuggestedTeams() {

  const [teams, setTeams] =
    useState([]);

  const [requests, setRequests] =
    useState([]);

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios.get(
      "http://localhost:8080/teams"
    )

    .then((teamResponse) => {

      axios.get(

        `http://localhost:8080/requests/user/${currentUser.id}`

      )

      .then((requestResponse) => {

        setRequests(requestResponse.data);

        const filteredTeams =
          teamResponse.data.filter((team) => {

            // founder should not see own teams
            if (
              team.ownerId === currentUser.id
            ) {
              return false;
            }

            // skill matching
            return currentUser.skills
              .toLowerCase()
              .split(",")

              .some((skill) =>

                team.requiredSkills
                  .toLowerCase()
                  .includes(skill.trim())
              );

          });

        setTeams(filteredTeams);

      });

    });

  }, []);

  const sendRequest = (teamId) => {

    axios.post(

      "http://localhost:8080/requests",

      {

        userId: currentUser.id,

        teamId: teamId,

        userName: currentUser.name,

        role: currentUser.role,

        message:
          "I want to join this team"

      }

    )

    .then(() => {

      alert("Request Sent");

      window.location.reload();

    });

  };

  const getStatus = (teamId) => {

    const req = requests.find(

      (r) => r.teamId === teamId
    );

    return req ? req.status : null;
  };

  return (

    <div className="container">

      <h1>Suggested Teams</h1>

      <div className="card-container">

        {teams.map((team) => (

          <div
            className="card"
            key={team.id}
          >

            <h2>{team.teamName}</h2>

            <p>{team.description}</p>

            <p>
              <strong>
                Required Skills:
              </strong>

              {team.requiredSkills}
            </p>

            {getStatus(team.id) ? (

              <p>
                <strong>Status:</strong>

                {getStatus(team.id)}
              </p>

            ) : (

              <button
                onClick={() =>
                  sendRequest(team.id)
                }
              >
                Request to Join
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default SuggestedTeams;