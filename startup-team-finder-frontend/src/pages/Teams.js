import React, { useEffect, useState } from "react";
import axios from "axios";

function Teams() {

  const [teams, setTeams] = useState([]);

  const [team, setTeam] = useState({
    teamName: "",
    description: ""
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios.get("http://localhost:8080/teams")
      .then((response) => {
        setTeams(response.data);
      });
  };

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    team.ownerId = currentUser.id;

    axios.post("http://localhost:8080/teams", team)
      .then(() => {

        alert("Team Created!");

        setTeam({
          teamName: "",
          description: "",
          requiredSkills: ""
        });

        fetchTeams();
      });
  };

  const currentUser =
  JSON.parse(localStorage.getItem("user"));

  if (currentUser.role !== "FOUNDER") {

  return (

    <div className="container">

      <h2>
        Only founders can create teams.
      </h2>

    </div>
  );
}

  return (

    <div className="container">

      <h1>Create Startup Team</h1>

      <form className="form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={team.teamName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={team.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="requiredSkills"
          placeholder="Required Skills"
          value={team.requiredSkills}
          onChange={handleChange}
        />

        <button type="submit">Create Team</button>

      </form>

      <h1>All Teams</h1>

      <div className="card-container">

        {teams.map((t) => (
          <div className="card" key={t.id}>

            <h3>{t.teamName}</h3>

            <p>{t.description}</p>

            <p>
              <strong>Required:</strong>
              {t.requiredSkills}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Teams;