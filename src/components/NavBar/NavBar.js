import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap'
  import Login from '../Login/Login';
  import Signup from '../Signup/Signup';

export default function NavBar(){
        return(
            <div>
                <div className="row">
                    <img src="Logo TP.png" alt="AppRocketLogo" className="justify-content-md-center"/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="light" variant="light" expand="lg" sticky="top">
                                <Navbar.Brand href="#">AppRocket Messaging App</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="justify-content-center" fill variant="tabs">
                                    <Nav.Link href="/Login">Login</Nav.Link>
                                    <Nav.Link href="/Signup">Signup</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
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