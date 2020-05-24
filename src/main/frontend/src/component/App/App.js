import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import Home from '../Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import BoardUser from "../Board/BoardUser";
import BoardModerator from "../Board/BoardModerator";
import BoardAdmin from "../Board/BoardAdmin";
import ItemStorage from "../Storage/ItemStorage";
import AllWorkers from "../Workers/AllWorkers";
import Notification from "../Notification";
import AllRooms from "../Rooms/AllRooms";
import AllGuests from "../Guests/AllGuests";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../ForgotPassword';
import AddGuest from "../Guests/AddGuest";
import AddReservation from "../Reservations/AddReservation";


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
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/itemstorage" component={ItemStorage} />
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route path="/notifications" component={Notification}/>
          <Route path="/pracownicy" component={AllWorkers} />
          <Route path="/rooms" component={AllRooms} />
          <Route path="/goscie" component={AllGuests}/>
          <Route path="/addguest" component={AddGuest} />
          <Route path="/addreservation" component={AddReservation}/>
        </Switch>
        </div>

      </Router>
    )
  }
}

export default App;