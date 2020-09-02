import React from 'react';
//import logo from './logo.svg';
import LandingPage from "./components/LandingPage";
import './App.css';

function App() {
  return (
    <Router history={history}>
      {/* <Header /> */}
      <Switch>
        
        <Route path="/"
          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <LandingPage />
            }
          }}

        />






        
        <Route path="/Appointments"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <Appointments />
            }
          }}


        />
        
        <Route path="/Autherization" component={Autherization} />
        <Route path="/logout" ><Logout /></Route>
        <Route path="/PDFShow" component={PDFShow} />
        
        <Route
          exact
          path="/"
          render={() => {

            localStorage.clear();
            return (
              <Redirect to="/Autherization" />

            )
          }}
        />
        <Route path="/*" component={PageNotFound} />

      </Switch>

    </Router>

  );
}

export default App;
