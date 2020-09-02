import React from 'react';
import LandingPage from "./components/LandingPage";
import ChatPage from "./components/ChatPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/"
          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/LandingPage" />
                )
            else {

              return <LandingPage />
              }
          }}

        />
          <Route path="/ChatPage"
            render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/LandingPage" />

              )
            else {

              return <ChatPage />
            }
            }}

          />
        
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        
        <Route
          exact
          path="/"
          render={() => {

            localStorage.clear();
            return (
              <Redirect to="/LandingPage" />
              )
            }}
        />

      </Switch>

    </Router>

  );
}

export default App;
