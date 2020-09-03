import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ChatPage from "./components/ChatPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <Router>
      <Switch>

      <Route exact path="/">
            <NavBar />
          </Route>

          {/* <Route path="/ChatPage"
            render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth === false)
              return (
                <Redirect to="/" />

              )
            else {

              return <ChatPage />
            }
            }}

          /> */}
        <Route path="/ChatPage" component={ChatPage} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        

      </Switch>

    </Router>

  );
}

export default App;
