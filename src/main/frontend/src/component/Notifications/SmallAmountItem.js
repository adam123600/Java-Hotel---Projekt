import React, { Component } from "react";
import { toast } from 'react-toastify';

import ItemService from "../../service/ItemService";
import NotificationService from "../../service/NotificationService";


export default class ForgotPassword extends Component{
    constructor(props){
        super(props);


        this.state = {
            allItems : [],
            message : "",
            success : false,
            toastId : null
        }
    }

    componentDidMount() {
        ItemService.getAllItems().then(
            response => {
                this.setState({
                    allItems: response.data
                });
                response.data.map( item => {
                    if(item.current_quantity < item.min_quantity) {
                        NotificationService.smallAmountItem(item).then(
                            responseNotification => {
                              this.setState({
                                message: responseNotification.data.message,
                                success: true
                              });
                
                              if(! toast.isActive(this.state.toastId)){
                                if(responseNotification.data.message != "Already in the database") {
                                  this.setState({
                                    toastId : toast.success(this.state.message, {
                                    position: toast.POSITION.BOTTOM_CENTER,
                                    autoClose: false
                                    })
                                  })
                                }
                              } 
                            }).catch(error => {
                                const resMessage = (error.response && error.response.data && error.response.data.message) ||
                                  error.message ||
                                  error.toString();
                      
                                this.setState({
                                  success: false,
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
                })
            },
            error => {
                this.setState({
                    allItems:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            },
        );
    }

    render(){
        return true;
    }
}