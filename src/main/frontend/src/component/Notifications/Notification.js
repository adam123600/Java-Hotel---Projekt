import React, { Component } from "react";
import NotificationService from "../../service/NotificationService";
import AuthService from "../../service/AuthService";
import WorkerService from "../../service/WorkerService"

import { toast } from 'react-toastify';
import "./Notification.css";
import ChangePassword from "../Workers/ChangePassword";


export default class Notification extends Component{
    constructor(props){
        super(props);

        this.state = {
            showAdminNotifications: false,
            allNotifications: [],
            resPassNotifications: [],
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
    
        if (user) {
          this.setState({
            currentUser: AuthService.getCurrentUser(),
            showAdminNotifications: user.roles.includes("ROLE_MANAGER")
          });
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

            NotificationService.getAllNotificationsByNotificationTypeId(this.state.type).then(
              response => {
                  this.setState({
                    resPassNotifications: response.data
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

      render(){
        const {worker, workerHref} = this.state;
          return(
            <div className="notification-container">
              {this.state.showAdminNotifications &&
               <div>
                  <h2>Prośby o zresetowanie hasła:</h2>
                  <div>
                    {this.state.resPassNotifications.map(notification => 
                      <div>
                        <div key={notification.id}>{notification.username}</div>
                          {this.state.allWorkers.map( worker => {
                            if(notification.username == worker.username) {
                              return <ChangePassword href={worker._links.self.href} currentWorker={worker}/>
                            }
                          })}
                      </div>
                    )}
                  </div>                 
                </div>
              }
                         
            </div>
          )
      }

}
