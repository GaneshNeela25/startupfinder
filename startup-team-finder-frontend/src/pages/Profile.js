import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./Profile.css";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [teams, setTeams] =
    useState([]);

  useEffect(() => {

    loadTeams();

  }, []);

  const loadTeams = async () => {

    try {

      const teamResponse =
        await axios.get(
          "http://localhost:8080/teams"
        );

      const allTeams =
        teamResponse.data;

      // FOUNDER
      if (
        user.role
          .toLowerCase()
          .includes("founder")
      ) {

        const founderTeams =

          allTeams.filter(

            (team) =>

              Number(team.ownerId) ===
              Number(user.id)

          );

        setTeams(founderTeams);

      }

      // NON FOUNDER
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

        // FILTER TEAMS
        const approvedTeams =

          allTeams.filter(

            (team) =>

              approvedTeamIds.includes(
                Number(team.id)
              )

          );

        setTeams(approvedTeams);

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="profile-page">

      <div className="profile-container">

        {/* LEFT SIDE */}

        <div className="profile-left">

          <div className="profile-avatar">

            {user.name?.charAt(0)}

          </div>

          <h1 className="profile-name">
            {user.name}
          </h1>

          <p className="profile-email">
            {user.email}
          </p>

          <div className="profile-info">

            <p>

              <span>Role:</span>

              <br />

              {user.role}

            </p>

            <p>

              <span>Skills:</span>

              <br />

              {user.skills}

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="profile-right">

          <h2 className="section-title">

            {

              user.role
                .toLowerCase()
                .includes("founder")

                ?

                "Created Teams"

                :

                "Approved Teams"

            }

          </h2>

          {

            teams.length === 0

            ?

            <div className="no-teams">

              No Teams Available

            </div>

            :

            <div className="teams-grid">

              {

                teams.map((team) => (

                  <div
                    className="team-card"
                    key={team.id}
                  >

                    <div className="team-icon">

                      {team.teamName?.charAt(0)}

                    </div>

                    <div className="team-details">

                      <p>

                        <strong>
                          Team Name:
                        </strong>

                        <br />

                        {team.teamName}

                      </p>

                      <p>

                        <strong>
                          Project Idea:
                        </strong>

                        <br />

                        {team.projectIdea}

                      </p>

                      <p>

                        <strong>
                          Required Skills:
                        </strong>

                      </p>

                      <div className="skill-badge">

                        {team.requiredSkills}

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          }

        </div>

      </div>

    </div>

  );

}

export default Profile;