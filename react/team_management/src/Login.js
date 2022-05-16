import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwt_decode from "jwt-decode";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function getData() {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    let user = decoded.sub;
    console.log(user);
    axios
      .get(`http://localhost:8088/users/getByName/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8088/users/signin", {
        username: username,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data);
        console.log(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Button variant="primary" onClick={getData}>
          Get logged in user data
        </Button>
      </Form>
    </div>
  );
}
