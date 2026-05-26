import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./TeamChat.css";

function TeamChat() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const selectedTeam =
    JSON.parse(
      localStorage.getItem("selectedTeam")
    ) || {};

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  useEffect(() => {

    fetchMessages();

  }, []);

  // FETCH CHAT MESSAGES

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

  // SEND MESSAGE

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

    })

    .catch((error) => {

      console.log(error);

    });

  };

  // UPLOAD FILE

  const uploadFile = async () => {

    if (!selectedFile) return;

    const formData =
      new FormData();

    formData.append(
      "teamId",
      selectedTeam.id
    );

    formData.append(
      "sender",
      user.name
    );

    formData.append(
      "file",
      selectedFile
    );

    try {

      await axios.post(

        "http://localhost:8080/chat/upload",

        formData

      );

      setSelectedFile(null);

      fetchMessages();

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="chat-page">

      <div className="chat-container">

        {/* HEADER */}

        <div className="chat-header">

          {

            selectedTeam?.teamName

            ||

            "Team Chat"

          }

        </div>

        {/* MESSAGES */}

        <div className="chat-messages">

          {

            messages.map((msg) => (

              <div
                key={msg.id}
                className={

                  msg.sender === user.name

                  ?

                  "my-message"

                  :

                  "other-message"

                }
              >

                <strong>

                  {msg.sender}

                </strong>

                {

                  msg.message !==
                  "FILE_SHARED"

                  &&

                  <p>

                    {msg.message}

                  </p>

                }

                {

                  msg.fileName && (

                    <a

                      href={

                        `http://localhost:8080/chat_uploads/${msg.fileName}`

                      }

                      target="_blank"

                      rel="noreferrer"

                      className="file-link"

                    >

                      📄 {msg.originalFileName}

                    </a>

                  )

                }

              </div>

            ))

          }

        </div>

        {/* INPUT AREA */}

        <div className="chat-input">

          <input
            type="text"
            placeholder="Type message..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setSelectedFile(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={uploadFile}
          >
            Upload
          </button>

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