import React, { useState, useEffect } from "react";

const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");

async function Login() {
    
    const data = { username: username_login, password: password_login }

    let result = "";
    try {
        await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',

            body: new URLSearchParams({
                'username': username_login,
                'password': password_login,

            }),
        }).then((response) => response.json()).then(async (data) => {
            result = data
            console.log("Result Login ", data)
            if (data.auth == false) {

                setErrorLogin("Wrong Username or Password");
            }
            else if (data.Message == "No User Found") {
                setErrorLogin("Please Enter Correct Username And Password");

            }
            else {
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
                            props.history.push("/FrontPage")

                        })
                    }

                    fetchData();




                }
                catch (error) {

                    setErrorLogin("Wrong Username or Password");

                }

            }


        })

    } catch (err) {

        return result = { auth: false }
    }


    return result
}