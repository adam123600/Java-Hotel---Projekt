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
import AllRooms from "../Rooms/AllRooms";
import Room from "../Rooms/Room";
import AllGuests from "../Guests/AllGuests";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../Notifications/ForgotPassword';
import AddGuest from "../Guests/AddGuest";
import AddReservation from "../Reservations/AddReservation";
import GuestDetails from "../Guests/GuestDetails";
import AllReservations from "../Reservations/AllReservations";
import AddWorker from "../Workers/AddWorker";
import CheckReservation from '../Reservations/CheckReservation';
import AllServices from "../Services/AllServices";
import Cleaning from "../Cleaning/Cleaning"

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
          <Route path="/workers" component={AllWorkers} />
          <Route path="/addworker" component={AddWorker}/>
          <Route exact path="/rooms" component={AllRooms} />
          <Route path="/rooms/:roomName" component={Room} />
          <Route exact path="/guests" component={AllGuests}/>
          <Route path="/guests/:id" component={GuestDetails}/>
          <Route path="/addguest" component={AddGuest} />
          <Route path="/reservations" component={AllReservations}/>
          <Route path="/addreservation" component={AddReservation}/>
          <Route path="/checkreservation" component={CheckReservation}/>
          <Route path="/services" component={AllServices}/>
          <Route path="/cleaning" component={Cleaning}/>
        </Switch>
        </div>

      </Router>
    )
  }
}

export default App;