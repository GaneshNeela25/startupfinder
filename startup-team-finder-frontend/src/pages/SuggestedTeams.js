import React, { useEffect, useState } from "react";

import axios from "axios";

function SuggestedTeams() {

  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState("");

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    axios.get("http://localhost:8080/teams")

      .then((response) => {

        const allTeams = response.data;

        const matchedTeams =
          allTeams.filter((team) => {

            return currentUser.skills
              .toLowerCase()
              .split(",")

              .some((skill) =>

                team.requiredSkills
                  .toLowerCase()
                  .includes(skill.trim())
              );
          });

        setTeams(matchedTeams);

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

      message: message

    }

  )

  .then(() => {

    alert("Request Sent!");

    setMessage("");
  });
};

  return (

    <div className="container">

      <h1>Suggested Teams</h1>

      <div className="card-container">

        {teams.map((team) => (

          <div className="card" key={team.id}>

            <h3>{team.teamName}</h3>

            <p>{team.description}</p>

            <p>
              <strong>Required:</strong>
              {team.requiredSkills}
            </p>

            <div>

  <input
    type="text"
    placeholder="Message to founder"
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
  />

    <button
        onClick={() => sendRequest(team.id)}
    >
        Request to Join
    </button>

</div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SuggestedTeams;