import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {Link, withRouter} from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthService from "../../service/AuthService";
import './LoginPage.css';
const hotelImg = require('../../image/hotel.jpg');


const required = value => {
  if (!value) {
    return (
      <div className="my-alert">
        This field is required!
      </div>
    );
  }
};



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      isChecked: false,
      toastId : null
    };
  }

  

  onCheckboxChange(e){
    this.setState({
      isChecked: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleClick(e) {
      e.preventDefault();
      console.log('Kliknięto w link Forgot Password.');
    }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
    
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {

    const isUser = AuthService.getCurrentUser();
    console.log("Jestem " + isUser);
    return (

      <div className="my-row">
        <div className="my-column">
          <div className="leftside">
            <img
              src={hotelImg}
              alt="Hotel"
              className="hotel-img"
            />
          </div>
        </div>

        <div className="my-column">
          <div className="rightside">
            <div className="login-container">
              { isUser ? (
                <div>
                  <div className="welcome-text">
                    <span>Welcome Back</span>
                  </div>
                  <a href="/home" className="login-text">{isUser.username}</a>
                </div>
              ) : (
                <div>
                  <div className="welcome-text">
                    <span>Welcome</span>
                  </div>

                  <Form className = "login-form"
                  onSubmit={this.handleLogin}
                  ref={c => {
                    this.form = c;
                  }}>

                    <div className="my-form-group">
                      <label htmlFor="username" className="my-label">USERNAME</label>
                      <Input
                        type="text"
                        className="input-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required]}
                      />
                    </div>

                    <div className="my-form-group">
                      <label htmlFor="password" className="my-label">PASSWORD</label>
                      <Input
                        type="password"
                        className="input-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                      />
                    </div>


                    <div className="checkbox">
                        <label htmlFor="checkid">
                          <input
                          id = "checkid"
                          type = "checkbox"
                          value = {this.state.isChecked}
                          onChange={this.onCheckboxChange}
                          />
                          <span className="remember-me-text"> Remember me</span>
                        </label>
                    </div>
                


                <div className="my-form-group">
                  <button
                    className="my-button login-button"
                    disabled={this.state.loading}
                  >
                    <span>LOGIN</span>
                  </button>
                </div>

                        <Link to = "/forgotpassword" className = "forgot-password-link">Forgot password?</Link>
    
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          )}

          </div>
        </div>
      </div>
     </div>

    );
  }
}