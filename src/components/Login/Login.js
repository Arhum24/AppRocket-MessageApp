import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
        await fetch("http://localhost:8000/api/Login", {
            method: 'POST',

            body: new URLSearchParams({
                'username': username,
                'password': password,

            }),
        }).then((response) => response.json()).then(async (data) => {
            
            try {
                    await localStorage.setItem("token", data.token)
                    async function fetchData() {

                        const token = localStorage.getItem("token");
                        await fetch("http://localhost:8000/api/auth/userdata", {
                            method: 'GET',
                            headers: {
                                'x-access-token': token, "Access-Control-Allow-Origin": "*",
                            },

                        }).then((response) => response.json()).then(async (data) => {

                            await localStorage.setItem("profile", JSON.stringify(data))
                            props.history.push("/ChatPage")

                        })
                    }
                        fetchData();
                }
                catch (error) {

                    setErrorLogin("Wrong Username or Password");

                }
        })

    } catch (err) {
        console.error(err);
    }

  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}