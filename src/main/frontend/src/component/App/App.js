import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from '../Home';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import BoardUser from "../Board/BoardUser";
import BoardModerator from "../Board/BoardModerator";
import BoardAdmin from "../Board/BoardAdmin";
import ItemStorage from "../ItemStorage";


class App extends Component {

  render() {

    return (
      <Router>
        <AppNavbar/>
        <div className="containter mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />            
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/itemstorage" component={ItemStorage} />
        </Switch>
        </div>

      </Router>
    )
  }
}

export default App;