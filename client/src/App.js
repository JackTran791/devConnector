import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import store from './store'

import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import PrivateRoute from './components/common/PrivateRoute'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing}></Route>
            <div className="container" style={{paddingBottom: '80px'}}>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profile/:handle" component={Profile}></Route>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>
              </Switch>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/not-found" component={NotFound}></Route>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
