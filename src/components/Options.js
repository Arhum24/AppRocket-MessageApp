import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar} from 'react-bootstrap';
import Grouping from './Grouping';
import Broadcast from './Broadcast';

export default function Name({ user, showName }) {
    return (
        <div className="name-component">
            <Router>


                <Navbar bg="light" variant="light">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <a class="nav-link " href="/Group">Add New Group</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/Broadcast">Send Broadcast</a>
                        </li>
                    </ul>
                </Navbar>


                <br />
                <Switch>
                    <Route path="/Group">
                        <Grouping />
                    </Route>

                    <Route path="/Broadcast">
                        <Broadcast />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
