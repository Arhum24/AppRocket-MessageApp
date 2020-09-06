import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import NavBar from '../NavBar/NavBar'

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        await fetch("https://approcketmessaging-node.herokuapp.com/api/Login", {
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
                        await fetch("https://approcketmessaging-node.herokuapp.com/api/userdata", {
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

                    console.error(error);

                }
        })

    } catch (err) {
        console.error(err);
    }

  }

  return (
    <div>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button variant="success" block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <br/>
      <br/>
      <Button variant="secondary" block bsSize="large" href="/">
          Back
        </Button>
        
    </div>
    </div>
  )
}
