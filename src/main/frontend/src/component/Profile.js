import React, { Component } from "react";
import AuthService from "../service/AuthService";
import WorkerService from "../service/WorkerService";
import ChangePassword from "./Workers/ChangePassword";


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
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <p>
          {this.state.allWorkers.map( user => {
            if(currentUser.username == user.username) {
               return <ChangePassword href={user._links.self.href} currentWorker={user}/>
            }
          })}
        </p>
      </div>
      
    );
  }
}