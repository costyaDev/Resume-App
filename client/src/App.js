import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/alert";
// redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/dashboard";
import PrivatRouting from "./components/routing/PrivatRouting";
import CreateProfile from "./components/profileDashForm/CreateProfile";
import EditProfile from "./components/profileDashForm/EditProfile";
import AddExperience from "./components/profileDashForm/AddExperience";
import AddEducation from "./components/profileDashForm/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivatRouting exact path="/dashboard" component={Dashboard} />
              <PrivatRouting
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivatRouting
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivatRouting
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivatRouting
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
