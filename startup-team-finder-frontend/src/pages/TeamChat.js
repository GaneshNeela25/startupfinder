import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function TeamChat() {

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const [approvedTeams, setApprovedTeams] =
    useState([]);

  const [selectedTeam, setSelectedTeam] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {

    axios.get(
      "http://localhost:8080/teams"
    )

    .then((teamResponse) => {

      axios.get(

        `http://localhost:8080/requests/user/${currentUser.id}`

      )

      .then((requestResponse) => {

        const approvedRequests =
          requestResponse.data.filter(

            (req) =>
              req.status === "APPROVED"
          );

        const availableTeams =
          teamResponse.data.filter(

            (team) => {

              if (
                team.ownerId === currentUser.id
              ) {
                return true;
              }

              return approvedRequests.some(

                (req) =>
                  req.teamId === team.id
              );

            }
          );

        setApprovedTeams(
          availableTeams
        );

      });

    });

  }, []);

  const openChat = (team) => {

    setSelectedTeam(team);

    axios.get(

      `http://localhost:8080/chat/${team.id}`

    )

    .then((response) => {

      setMessages(response.data);

    });

  };

  const sendMessage = () => {

    if (!message.trim()) return;

    const newMessage = {

      teamId: selectedTeam.id,

      sender: currentUser.name,

      message: message

    };

    axios.post(

      "http://localhost:8080/chat",

      newMessage

    )

    .then(() => {

      axios.get(

        `http://localhost:8080/chat/${selectedTeam.id}`

      )

      .then((response) => {

        setMessages(response.data);

      });

    });

    setMessage("");
  };

  return (

    <div className="container">

      <h1>Team Chat</h1>

      <div className="card-container">

        {approvedTeams.map((team) => (

          <div
            className="card"
            key={team.id}
          >

            <h2>{team.teamName}</h2>

            <button
              onClick={() =>
                openChat(team)
              }
            >
              Open Chat
            </button>

          </div>

        ))}

      </div>

      {selectedTeam && (

        <div className="chat-container">

          <h2>
            {selectedTeam.teamName}
          </h2>

          <div className="messages">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className="message"
              >

                <strong>
                  {msg.sender}:
                </strong>

                {msg.message}

              </div>

            ))}

          </div>

          <div className="chat-input">

            <input
              type="text"
              placeholder="Type message"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <button
              onClick={sendMessage}
            >
              Send
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default TeamChat;