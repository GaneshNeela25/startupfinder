import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function TeamChat() {

  const [allowed, setAllowed] =
    useState(false);

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const teamId = 2;

  useEffect(() => {

    axios.get(

      `http://localhost:8080/members/${teamId}`

    )

    .then((response) => {

      const exists =
        response.data.some(

          (member) =>

            member.userId ===
            currentUser.id
        );

      setAllowed(exists);

    });

  }, []);

  return (

    <div className="container">

      {allowed ? (

        <div>

          <h1>Team Chat</h1>

          <p>
            Chat feature enabled.
          </p>

        </div>

      ) : (

        <h1>
          Access Denied
        </h1>

      )}

    </div>
  );
}

export default TeamChat;