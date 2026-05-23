import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./Team.css";

function Teams() {

  const navigate =
    useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [teams, setTeams] =
    useState([]);

  useEffect(() => {

  const loadTeams = async () => {

    try {

      // ALL TEAMS
      const teamResponse =
        await axios.get(
          "http://localhost:8080/teams"
        );

      const allTeams =
        teamResponse.data;

      // USER ROLE
      const role =
        currentUser.role
          .toLowerCase()
          .trim();

      // ===== FOUNDER =====
      if (role.includes("founder")) {

        const founderTeams =

          allTeams.filter(

            (team) =>

              Number(team.ownerId) ===
              Number(currentUser.id)

          );

        setTeams(founderTeams);

      }

      // ===== NON FOUNDER =====
      else {

        const requestResponse =
          await axios.get(

            `http://localhost:8080/requests/user/${currentUser.id}`

          );

        // ONLY APPROVED
        const approvedRequests =

          requestResponse.data.filter(

            (req) =>

              req.status ===
              "APPROVED"

          );

        // TEAM IDS
        const approvedTeamIds =

          approvedRequests.map(

            (req) =>
              Number(req.teamId)

          );

        // FILTER TEAMS
        const joinedTeams =

          allTeams.filter(

            (team) =>

              approvedTeamIds.includes(
                Number(team.id)
              )

          );

        setTeams(joinedTeams);

      }

    } catch (error) {

      console.log(error);

    }

  };

  loadTeams();

}, []);

  const openChat = (team) => {

  const isApproved = teams.some(
    (t) => t.id === team.id
  );

  if (!isApproved) {

    alert(
      "You are not approved for this team"
    );

    return;
  }

  localStorage.setItem(
    "selectedTeam",
    JSON.stringify(team)
  );

  navigate("/team-chat");

};

  return (

    <div className="team-page">

      {
  currentUser.role
    .toLowerCase()
    .includes("founder")

  &&

  <div className="create-team-box">

    <button
      className="create-team-btn"
      onClick={() =>
        navigate("/create-team")
      }
    >
      + Create New Team
    </button>

  </div>
}

      <h1>Your Teams</h1>

      <div className="team-grid">

        {teams.length === 0 ? (

          <div className="empty-box">

            No Teams Available

          </div>

        ) : (

          teams.map((team) => (

            <div
              className="team-card"
              key={team.id}
            >

              <div className="team-icon">

                {team.teamName
                  ?.charAt(0)}

              </div>

              <h2>
                {team.teamName}
              </h2>

              <p>
                {team.description}
              </p>

              <div className="skills-box">

                {team.requiredSkills}

              </div>

              <button
                className="chat-btn"
                onClick={() =>
                  openChat(team)
                }
              >
                Open Chat
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Teams;