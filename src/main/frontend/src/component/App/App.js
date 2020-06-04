import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from '../Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from "../Login/Login";
import Register from "../Register";
import Profile from "../Profile";
import ItemStorage from "../Storage/ItemStorage";
import AllWorkers from "../Workers/AllWorkers";
import Notification from "../Notifications/Notification";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../Notifications/ForgotPassword';
import AddWorker from "../Workers/AddWorker";

toast.configure();

class App extends Component {

  render() {

    return (
      <Router>
        <AppNavbar/>
        <div className="new-container">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/itemstorage" component={ItemStorage} />
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route path="/notifications" component={Notification}/>
          <Route path="/pracownicy" component={AllWorkers} />

        </Switch>
        </div>

      </Router>
    )
  }
}

export default App;