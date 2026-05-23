import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./TeamChat.css";

function TeamChat() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  const selectedTeam =
  JSON.parse(localStorage.getItem("selectedTeam")) || {};

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  useEffect(() => {

    fetchMessages();

  }, []);

  const fetchMessages = () => {

    axios.get(

      `http://localhost:8080/chat/${selectedTeam.id}`

    )

    .then((response) => {

      setMessages(response.data);

    })

    .catch((error) => {

      console.log(error);

    });

  };

  const sendMessage = () => {

    if (!text.trim()) return;

    axios.post(

      "http://localhost:8080/chat",

      {
        sender: user.name,
        message: text,
        teamId: selectedTeam.id
      }

    )

    .then(() => {

      setText("");

      fetchMessages();

    });

  };

  return (

    <div className="chat-page">

      <div className="chat-container">

        <div className="chat-header">

          {selectedTeam?.teamName || "Team Chat"}

        </div>

        <div className="chat-messages">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={
                msg.sender === user.name
                ? "my-message"
                : "other-message"
              }
            >

              <strong>
                {msg.sender}
              </strong>

              <p>{msg.message}</p>

            </div>

          ))}

        </div>

        <div className="chat-input">

          <input
            type="text"
            placeholder="Type message..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default TeamChat;