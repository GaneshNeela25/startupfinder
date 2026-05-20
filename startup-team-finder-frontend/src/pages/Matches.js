import React, { useEffect, useState } from "react";
import axios from "axios";

function Matches() {

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [matches, setMatches] = useState([]);

  useEffect(() => {

    if (currentUser.skills) {

      const firstSkill =
        currentUser.skills.split(",")[0];

      axios.get(
        `http://localhost:8080/users/match?skill=${firstSkill}&id=${currentUser.id}`
      )

      .then((response) => {
        setMatches(response.data);
      });

    }

  }, []);

  return (

    <div className="container">

      <h1>Recommended Teammates</h1>

      <div className="card-container">

        {matches.map((user) => (

          <div className="card" key={user.id}>

            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <h3>{user.name}</h3>

            <p>{user.role}</p>

            <p>{user.skills}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Matches;