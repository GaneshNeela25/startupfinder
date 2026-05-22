import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function TeamMembers() {

  const [members, setMembers] =
    useState([]);

  const teamId = 1;

  useEffect(() => {

    axios.get(
      `http://localhost:8080/members/${teamId}`
    )

    .then((response) => {

      setMembers(response.data);

    });

  }, []);

  return (

    <div className="container">

      <h1>Team Members</h1>

      <div className="card-container">

        {members.map((member) => (

          <div className="card" key={member.id}>

            <h3>{member.userName}</h3>

            <p>{member.role}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeamMembers;