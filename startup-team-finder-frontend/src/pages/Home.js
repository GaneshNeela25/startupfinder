import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {

    axios.get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      });

  };

  const searchUsers = () => {

    if (search.trim() === "") {

      fetchUsers();

    } else {

      axios.get(
        `http://localhost:8080/users/search?skill=${search}`
      )

      .then((response) => {
        setUsers(response.data);
      });

    }

  };

  return (

    <div className="container">

      <h1>Startup Members</h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search by skill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchUsers}>
          Search
        </button>

      </div>

      <div className="card-container">

        {users.map((user) => (

          <div className="card" key={user.id}>

            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>{user.skills}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;