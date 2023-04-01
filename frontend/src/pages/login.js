import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoggedIn(true);
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch((error) => console.error(error));
  }

  if (loggedIn) {
    return <Redirect to="/patient" />;
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
