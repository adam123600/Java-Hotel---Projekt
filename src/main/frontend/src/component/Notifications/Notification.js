import React, { Component } from "react";
import NotificationService from "../../service/NotificationService";
import AuthService from "../../service/AuthService";
import WorkerService from "../../service/WorkerService";
import SmallAmountItem from "./SmallAmountItem";

import { toast } from 'react-toastify';
import "./Notification.css";
import ChangePassword from "../Workers/ChangePassword";
import { Button } from "@material-ui/core";
import {Spinner, Table} from "reactstrap";

const FLAW_ID = 4;

export default class Notification extends Component{
    constructor(props){
        super(props);

        this.state = {
            showRepairmanNotifications: false,
            showAdminNotifications: false,
            showKitchenManagerNotifications: false,
            allNotifications: [],
            currentNotifications: [],
            allWorkers: [],
            type : 1,
            message: "",
            loading: true
        }

        WorkerService.getAllWorkers().then(result => {
          this.setState({allWorkers: result});
      });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        var typeOfNot = this.state.type;
        if (user) {
          this.setState({
            currentUser: AuthService.getCurrentUser(),
            showAdminNotifications: user.roles.includes("ROLE_MANAGER"),
            showRepairmanNotifications: user.roles.includes("ROLE_REPAIRMAN"),
            showKitchenManagerNotifications: user.roles.includes("ROLE_KITCHEN_MANAGER")
          });
          if(user.roles.includes("ROLE_REPAIRMAN")){
            typeOfNot = FLAW_ID;
          }
        }
    
        NotificationService.getAllNotifications().then(
            response => {
                this.setState({
                    allNotifications: response.data
                });
            }).catch(error => {
                const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            this.setState({
                loading: false,
                message: resMessage
              });
           
              if(! toast.isActive(this.state.toastId)){
                this.setState({
                    toastId : toast.error(this.state.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: false
                  })
                })
              }
            });

            NotificationService.getAllNotificationsByNotificationTypeId(typeOfNot).then(
              response => {
                  this.setState({
                    currentNotifications: response.data,
                    loading: false
                  });

              }).catch(error => {
                  const resMessage =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
  
              this.setState({
                  loading: false,
                  message: resMessage
                });
             
                if(! toast.isActive(this.state.toastId)){
                  this.setState({
                      toastId : toast.error(this.state.message, {
                      position: toast.POSITION.BOTTOM_CENTER,
                      autoClose: false
                    })
                  })
                }
              });
    }

    handleDeleteNotification(id) {
      NotificationService.deleteNotificationById(id);
      window.location.reload();
    }

      render(){
        
          return(
            <div className="notification-container">
              {this.state.loading && <Spinner animation="border" variant="primary" />}
              <SmallAmountItem/>
              {this.state.showAdminNotifications &&
               <div>
                   <h1 className="headers">Prośby o zresetowanie hasła:</h1>
                   <Table striped>
                       <thead>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type === "RES_USER_PASSWORD") {
                        return (
                            <tr>
                            <td key={notification.id} style={{display: 'inline-flex'}}>
                                <h1 className="text-not">{notification.username}</h1>
                            </td>
                            {'  '}
                            <td style={{display: 'inline-flex'}}>
                              {this.state.allWorkers.map( worker => {
                                if(notification.username === worker.username) {
                                  return <ChangePassword href={worker._links.self.href} currentWorker={worker}/>
                                }
                              })}
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="button-not">
                              Usuń powiadomienie
                            </button>
                            </td>
                            </tr>)
                      }})}
                       </thead>
                   </Table>
                   <h1 className="headers">Przedmioty:</h1>
                  <Table striped>
                      <thead>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type === "SMALL_AMOUNT_ITEM") {
                        return (
                          <tr>
                            <td key={notification.id} style={{display: 'inline-flex'}}>
                                <h1 className="text-not">{notification.description}</h1>
                            </td>

                            <td>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="button-not">
                              Usuń powiadomienie
                            </button>
                            </td>
                          </tr>)
                      }})}
                      </thead>
                  </Table>
                   <h1 className="headers">Usterki:</h1>
                  <Table striped>
                      <thead>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type === "FLAW") {
                        return (
                          <tr>
                            <td key={notification.id} style={{display: 'inline-flex'}}>
                                <h1 className="text-not">{notification.description}</h1>
                            </td>
                              <td>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="button-not">
                              Usuń powiadomienie
                            </button>
                              </td>
                          </tr>)
                      }})}
                      </thead>
                  </Table>
                </div>
              }
              {this.state.showRepairmanNotifications &&
                <div>
                    <h1 className="headers">Usterki</h1>
                  <Table striped>
                      <thead>
                    {this.state.currentNotifications.map(notification => 
                      <tr>
                        <td key={notification.id} style={{display: 'inline-flex'}}>
                            <h1 className="text-not">{notification.description}</h1>
                        </td>
                        <td style={{display: 'inline-flex'}}>
                        <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="button-not">
                          Usuń powiadomienie
                        </button>
                        </td>
                      </tr>
                    )}
                      </thead>
                  </Table>
                </div>
              }    

               {this.state.showKitchenManagerNotifications &&
               <div>
                   <h1 className="headers">Przedmioty:</h1>
                  <Table striped>
                      <thead>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type === "SMALL_AMOUNT_ITEM") {
                        return (
                          <tr>
                            <td key={notification.id} style={{display: 'inline-flex'}}>
                                <h1 className="text-not">{notification.description}</h1>
                            </td>
                              <td>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="button-not">
                              Usuń powiadomienie
                            </button>
                              </td>
                          </tr>)
                      }})}
                      </thead>
                  </Table>
                </div>
              }       
            </div>
          )
      }

}
