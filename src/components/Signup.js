import React, { useState, useEffect } from "react";

async function Signup(e) {

    if (username === "") {
        var error_fields = error;
        error.name = "Please Enter Username"
        setError(error_fields)

    }
    if (password === "") {
        var error_fields = error;
        error.password = "Please Enter Password"
        setError(error_fields)

    }
    
    if (username != "" && password != "" ) {
        let result = { auth: true };
        try {
            await fetch("http://localhost:8000/api/auth/register", {
                method: 'POST',

                body: new URLSearchParams({
                    'email': email,
                    'password': password,
                    'cnic': cnic,
                    'licence': licence,
                    'licence_country': licence_country,
                    'name': name,
                    'qualification': qualification,
                    'phone_number': phone_number,
                    'hospital': hospital,


                }),
            }).then((response) => response.json()).then((data) => {
                result = data;
                console.log("Result = ", result.errmsg)
                if (result.error) {
                    Message.error(<div style={{ width: 500 }}>User Already Exists. Make sure that CNIC/Licence/Email is not already registered</div>, 3, {
                        position: "bottom-right",
                        title: 'Failure',
                    })
                    setErrorRegister("User Already Exist")

                }
                else {
                    Message.success(<div style={{ width: 240 }}>Successfully Registered</div>, 3, {
                        position: "bottom-right",
                        title: 'Success',
                    })
                }
                return result


            })
        } catch (err) {

            return result = { auth: false, error: err }
        }



    }
    return { auth: false, }

}