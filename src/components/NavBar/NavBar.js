import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Logo from './LogoTP.png';

export default function NavBar() {
    return (
        <div class="container">
            <div className="row">
                <div className="col-md-12">
                    <img src={Logo} alt="AppRocketLogo" class="nav justify-content-center"/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Router>

                        
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand href="#">AppRocket Messaging</Navbar.Brand>
                            <ul class="nav justify-content-center nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/Login">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/Signup">Signup</a>
                                </li>
                            </ul>
                        </Navbar>

                        
                        <br />
                        <Switch>
                            <Route path="/Login">
                                <Login />
                            </Route>

                            <Route path="/Signup">
                                <Signup />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );

}