import React from "react";
import { useState } from "react";
import loginServices from "../services/login";
import config from "../utils/config";
import { useEffect } from "react";
const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      if (user) {
        window.localStorage.setItem(
          config.localStorageUserKey,
          JSON.stringify(user)
        );
        setUser(user);
        setUsername("");
        setPassword("");
      }
    } catch (error) {}
  };

  return (
    <div>
      <form action="post" onSubmit={handleLogin}>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="Username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />{" "}
        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="Password"
          id="password"
          value={password}
          placeholder="*********"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
