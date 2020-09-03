import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Logo from './LogoTP.png';

export default function NavBar() {
    return (
        <div>
            
            <Container>
            <Router>
            <Row>
                    <Col lg="4">
                        <img src={Logo} alt="AppRocketLogo" class="nav justify-content-center"/>
                    </Col>
                    
                    <Col lg="4">
                        <p>App Rocket</p>
                        <p>Messaging</p>
                        <p>App</p>
                    </Col>

                    <Col lg="4">
                        <Button variant="primary" size="lg" href="/Login">
                            Login
                        </Button>
                        <Button variant="primary" size="lg" href="/Signup">
                            Signup
                        </Button>
                    </Col>
            </Row>

            
                    
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
                
            
            </Container>
        </div>
    );

}