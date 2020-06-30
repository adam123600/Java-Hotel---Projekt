import React, { Component } from "react";
import AuthService from "../service/AuthService";
import WorkerService from "../service/WorkerService";
import './Reservations/Reservation.css';




export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      allWorkers: [],
    };

    WorkerService.getAllWorkers().then(result => {
      this.setState({allWorkers: result});
  });
  }

  render() {
    const { currentUser } = this.state;

    return (

      <div className="my-reservation-container">
          <div className="reservation-form">

              <div className="reservation-text">
                  <span>Cześć {currentUser.username} !</span>
              </div>
          </div>
      </div>
      
    );
  }
}