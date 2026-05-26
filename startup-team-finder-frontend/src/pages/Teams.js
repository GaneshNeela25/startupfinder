import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "./Team.css";

function Teams() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [teams, setTeams] =
    useState([]);

  const [teamMembers, setTeamMembers] =
    useState({});

  useEffect(() => {

    fetchTeams();

  }, []);

  // FETCH TEAMS

  const fetchTeams = async () => {

    try {

      // GET ALL TEAMS

      const teamResponse =
        await axios.get(

          "http://localhost:8080/teams"

        );

      const allTeams =
        teamResponse.data;

      // FOUNDER LOGIN

      if (
        user.role === "FOUNDER"
      ) {

        const founderTeams =

          allTeams.filter(

            (team) =>

              Number(team.ownerId) ===
              Number(user.id)

          );

        setTeams(founderTeams);

        fetchMembers(founderTeams);

      }

      // NORMAL USERS

      else {

        const requestResponse =
          await axios.get(

            `http://localhost:8080/requests/user/${user.id}`

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

        // SHOW ONLY APPROVED TEAMS

        const joinedTeams =

          allTeams.filter(

            (team) =>

              approvedTeamIds.includes(

                Number(team.id)

              )

          );

        setTeams(joinedTeams);

        fetchMembers(joinedTeams);

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  // FETCH MEMBERS

  const fetchMembers = async (teamsData) => {

    let membersData = {};

    for (let team of teamsData) {

      try {

        const response =
          await axios.get(

            `http://localhost:8080/requests/team/${team.id}`

          );

        membersData[team.id] =
          response.data;

      }

      catch (error) {

        console.log(error);

      }

    }

    setTeamMembers(membersData);

  };

  // OPEN CHAT

  const openChat = (team) => {

    localStorage.setItem(

      "selectedTeam",

      JSON.stringify(team)

    );

    navigate("/team-chat");

  };

  // VIEW MEMBERS

  const viewMembers = (team) => {

    const members =
      teamMembers[team.id] || [];

    let founderDetails =

      `Founder Name: ${team.ownerName || "Founder"}\n\n` +

      `Role: Founder\n\n` +

      `Skills: ${team.ownerSkills || "Not Added"}\n\n`;

    let memberDetails =

      members.length > 0

      ?

      members.map((member, index) =>

        `${index + 1}. ${member.userName}

Role: ${member.role}

Skills: ${member.skills || "Not Added"}`

      ).join("\n\n")

      :

      "No accepted members yet";

    alert(

      founderDetails +

      "Accepted Members:\n\n" +

      memberDetails

    );

  };

  return (

    <div className="teams-page">

      <div className="teams-container">

        <h1 className="teams-heading">

          Your Teams

        </h1>

        {

          user.role === "FOUNDER"

          &&

          <button
            className="create-team-btn"
            onClick={() =>
              navigate("/create-team")
            }
          >

            + Create Team

          </button>

        }

        <div className="teams-grid">

          {

            teams.length > 0

            ?

            teams.map((team) => (

              <div
                key={team.id}
                className="team-card"
              >

                <div className="team-avatar">

                  {

                    team.teamName
                    ?.charAt(0)
                    ?.toUpperCase()

                  }

                </div>

                <h2>

                  {team.teamName}

                </h2>

                <p>

                  {team.projectIdea}

                </p>

                <div className="team-skill">

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

                <button
                  className="members-btn"
                  onClick={() =>
                    viewMembers(team)
                  }
                >

                  Team Members

                </button>

              </div>

            ))

            :

            <h2 style={{ color: "white" }}>

              No Teams Available

            </h2>

          }

        </div>

      </div>

    </div>

  );

}

export default Teams;