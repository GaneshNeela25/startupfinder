import { useState } from "react";
import axios from "axios";
import "./Team.css";

function CreateTeam() {

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [teamName, setTeamName] =
    useState("");

  const [projectIdea, setProjectIdea] =
    useState("");

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const handleCreate = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      "http://localhost:8080/teams/create",
      {
        teamName,
        projectIdea,
        requiredSkills,
        ownerId: currentUser.id,
      }
    );

    console.log(response.data);

    alert("Team Created");

  } catch (error) {

    console.log("FULL ERROR:", error);

    console.log("RESPONSE:", error.response);

    console.log("DATA:", error.response?.data);

    alert(
      JSON.stringify(
        error.response?.data
      )
    );

  }

};

  return (

    <div className="teams-container">

      <div className="team-form-card">

        <h2>Create Team</h2>

        <form onSubmit={handleCreate}>

          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) =>
              setTeamName(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Project Idea"
            value={projectIdea}
            onChange={(e) =>
              setProjectIdea(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Required Skills"
            value={requiredSkills}
            onChange={(e) =>
              setRequiredSkills(e.target.value)
            }
            required
          />

          <button type="submit">
            Create Team
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateTeam;