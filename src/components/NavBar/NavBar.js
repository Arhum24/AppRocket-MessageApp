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
            </Row>
            <Row>
                
            <Col lg="6">
                        <h2>App Rocket</h2>
                        <h2>Messaging App</h2>
                    </Col>
            </Row>
            <Row>
            <Col lg="2">
                        <Button variant="secondary" size="lg" href="/Login">
                            Login
                        </Button>
                        
                    </Col>
            <Col lg="2">
            <Button variant="secondary" size="lg" href="/Signup">
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