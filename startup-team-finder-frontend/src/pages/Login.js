import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post("http://localhost:8080/login", user)

      .then((response) => {

        if (response.data && response.data.id) {

          localStorage.setItem(
            "user",
            JSON.stringify(response.data)
          );

          alert("Login Successful");

          window.location.href = "/";

        } else {

          alert("Invalid Credentials");

        }

      })

      .catch(() => {

        alert("Login Failed");

      });

  };

  return (

    <div className="container">

      <h1>Login</h1>

      <form className="form" onSubmit={handleSubmit}>

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

        <button type="submit">
          Login
        </button>

        <p>
        New User? <Link to="/register">Register Here</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;