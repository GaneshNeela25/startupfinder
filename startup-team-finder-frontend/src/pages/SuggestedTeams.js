import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./SuggestedTeams.css";

function SuggestedTeams() {

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [teams, setTeams] =
    useState([]);

  const [requests, setRequests] =
    useState([]);

  const [messages, setMessages] =
    useState({});

  const [resumes, setResumes] =
    useState({});

  useEffect(() => {

    // FETCH TEAMS
    axios.get(

      "http://localhost:8080/teams"

    )

    .then((response) => {

      const filteredTeams =
        response.data.filter(

          (team) =>
            team.ownerId !==
            currentUser.id
        );

      setTeams(filteredTeams);

    });

    // FETCH USER REQUESTS
    axios.get(

      `http://localhost:8080/requests/user/${currentUser.id}`

    )

    .then((response) => {

      setRequests(response.data);

    });

  }, []);

  const sendRequest = async (
    teamId
  ) => {

    try {

      const formData =
        new FormData();

      formData.append(
        "message",
        messages[teamId] || ""
      );

      formData.append(
        "role",
        currentUser.role
      );

      formData.append(
        "userId",
        currentUser.id
      );

      formData.append(
        "teamId",
        teamId
      );

      formData.append(
        "userName",
        currentUser.name
      );

      formData.append(
        "skills",
        currentUser.skills
      );

      if (resumes[teamId]) {

        formData.append(
          "resume",
          resumes[teamId]
        );

      }

      await axios.post(

        "http://localhost:8080/requests/send",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }

      );

      alert(
        "Request Sent Successfully"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to send request"
      );

    }

  };

  const getRequestStatus = (
    teamId
  ) => {

    return requests.find(

      (req) =>
        req.teamId === teamId

    );

  };

  return (

    <div className="suggested-page">

      <div className="suggested-header">

        <h1>
          Suggested Teams
        </h1>

      </div>

      <div className="teams-grid">

        {teams.map((team) => {

          const existingRequest =
            getRequestStatus(
              team.id
            );

          return (

            <div
              className="team-card"
              key={team.id}
            >

              <h2>
                {team.teamName}
              </h2>

              <p>

                <strong>
                  Required Skills:
                </strong>

                {" "}
                {team.requiredSkills}

              </p>

              {!existingRequest ? (

                <>

                  <textarea
                    placeholder="Why do you want to join?"
                    onChange={(e) =>
                      setMessages({

                        ...messages,

                        [team.id]:
                          e.target.value,

                      })
                    }
                  />

                  <input
                    type="file"
                    onChange={(e) =>
                      setResumes({

                        ...resumes,

                        [team.id]:
                          e.target.files[0],

                      })
                    }
                  />

                  <button
                    onClick={() =>
                      sendRequest(
                        team.id
                      )
                    }
                  >
                    Send Request
                  </button>

                </>

              ) : (

                <div
                  className={`request-status ${existingRequest.status.toLowerCase()}`}
                >

                  {existingRequest.status}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default SuggestedTeams;