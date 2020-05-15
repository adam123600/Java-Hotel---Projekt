import React, { Component } from "react";
import NotificationService from "../service/NotificationService";
import AuthService from "../service/AuthService";

import { toast } from 'react-toastify';
import "./Notification.css";


export default class Notification extends Component{
    constructor(props){
        super(props);

        this.state = {
            showAdminNotifications: false,
            allNotifications: [],
            resPassNotifications: [],
            type : 1,
            message: ""
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: AuthService.getCurrentUser(),
            showAdminNotifications: user.roles.includes("ROLE_ADMIN")
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
          return(
            <div className="notification-container">
              {this.state.showAdminNotifications &&
               <div>
                  <h2>Prośby o zresetowanie hasła:</h2>
                  <div>
                    {this.state.resPassNotifications.map(notification => <div key={notification.id}>{notification.username}</div>)}
                  </div>
                                         
                </div>
              }
                         
            </div>
          )
      }

}
