import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { toast } from 'react-toastify';
import CheckButton from "react-validation/build/button";

import ForgotPasswordService from "../../service/NotificationService";



export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);


        this.state = {
            username : "",
            message : "",
            success : false,
            toastId : null
        }
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }

    handleForgotPassword(e){
        e.preventDefault();

        this.setState({
          message: "",
          success: false
        });

        this.form.validateAll(); 

        
        if (this.checkBtn.context._errors.length === 0) {
          ForgotPasswordService.forgotUserPassword(this.state.username).then(
            response => {
              this.setState({
                message: response.data.message,
                success: true
              });

              if(! toast.isActive(this.state.toastId)){
                this.setState({
                    toastId : toast.success(this.state.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: false
                  })
                })
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

    }

    render(){
        return(
            
            <Form className = "login-form" 
            onSubmit={this.handleForgotPassword}
            ref={c => {
              this.form = c;
            }}>


                <div className="my-form-group">
                  <label htmlFor="username" className="my-label">Nazwa użytkownika</label>
                  <Input
                    type="text"
                    className="input-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </div>

                <div className="my-form-group">
                      <button className="my-button login-button">
                        <span>Wyślij prośbę do managera</span>
                      </button>
                </div>

                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
            </Form>
        )
    }
}