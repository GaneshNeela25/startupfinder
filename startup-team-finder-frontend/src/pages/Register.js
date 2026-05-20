import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    skills: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

  e.preventDefault();

  axios.post("http://localhost:8080/users", user)

    .then((response) => {

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Registration Successful");

      window.location.href = "/";

    })

    .catch((error) => {

      console.log(error);

    });

};

  return (
    <div className="container">
      <h1>Register User</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role (Developer/Designer)"
          value={user.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={user.skills}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;