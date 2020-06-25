import React, { Component } from "react";
import NotificationService from "../../service/NotificationService";
import AuthService from "../../service/AuthService";
import WorkerService from "../../service/WorkerService";
import SmallAmountItem from "./SmallAmountItem";

import { toast } from 'react-toastify';
import "./Notification.css";
import ChangePassword from "../Workers/ChangePassword";
import { Button } from "@material-ui/core";

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
            message: ""
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
                    currentNotifications: response.data
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
              <SmallAmountItem/>
              {this.state.showAdminNotifications &&
               <div>
                  <h2>Prośby o zresetowanie hasła:</h2>
                  <div>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type == "RES_USER_PASSWORD") {
                        return (
                          <div style={{padding: '25px'}}>
                            <div key={notification.id} style={{display: 'inline-flex'}}>
                              {notification.username}
                            </div>
                            {'  '}
                            <div style={{display: 'inline-flex'}}>
                              {this.state.allWorkers.map( worker => {
                                if(notification.username == worker.username) {
                                  return <ChangePassword href={worker._links.self.href} currentWorker={worker}/>
                                }
                              })}
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="btn btn-danger">
                              Usuń powiadomienie
                            </button>
                            </div>
                          </div>)
                      }})}                                            
                  </div>     
                  <h2>Przedmioty:</h2>     
                  <div>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type == "SMALL_AMOUNT_ITEM") {
                        return (
                          <div style={{padding: '25px'}}>
                            <div key={notification.id} style={{display: 'inline-flex'}}>
                              {notification.description}
                            </div>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="btn btn-danger">
                              Usuń powiadomienie
                            </button>
                          </div>)
                      }})}                                            
                  </div>         
                  <h2>Usterki:</h2>     
                  <div>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type == "FLAW") {
                        return (
                          <div style={{padding: '25px'}}>
                            <div key={notification.id} style={{display: 'inline-flex'}}>
                              {notification.description}
                            </div>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="btn btn-danger">
                              Usuń powiadomienie
                            </button>
                          </div>)
                      }})}                                            
                  </div>   
                </div>
              }
              {this.state.showRepairmanNotifications &&
                <div>
                  <h2>Usterki</h2>
                  <div>
                    {this.state.currentNotifications.map(notification => 
                      <div style={{padding: '25px'}}>

                        <div key={notification.id} style={{display: 'inline-flex'}}>
                          {notification.description}
                        </div>
                        <div style={{display: 'inline-flex'}}>
                        <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="btn btn-danger">
                          Usuń powiadomienie
                        </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              }    

               {this.state.showKitchenManagerNotifications &&
               <div> 
                  <h2>Przedmioty:</h2>     
                  <div>
                    {this.state.allNotifications.map(notification => {
                      if(notification.notType.type == "SMALL_AMOUNT_ITEM") {
                        return (
                          <div style={{padding: '25px'}}>
                            <div key={notification.id} style={{display: 'inline-flex'}}>
                              {notification.description}
                            </div>
                            {'  '}
                            <button onClick={this.handleDeleteNotification.bind(this, notification.id)} className="btn btn-danger">
                              Usuń powiadomienie
                            </button>
                          </div>)
                      }})}                                            
                  </div>         
                </div>
              }       
            </div>
          )
      }

}
