import React, { Component } from "react";
import { toast } from 'react-toastify';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import WorkerService from "../../service/WorkerService";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane!
        </div>
      );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          Hasło musi mieć od 6 do 40 znaków!
        </div>
      );
    }
};



export default class ChangePassword extends Component {


    constructor(props) {
        super(props)
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            currentUser: this.props.currentWorker,
            password: "",
            confirmPassword: "",
            successful: false,
            message: "",
            toastId : null,
            open: false
        };
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false,
        });
        window.location.reload();
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }
     
    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        
        if (this.checkBtn.context._errors.length === 0) {

            if (this.state.password !== this.state.confirmPassword) {
                if(! toast.isActive(this.state.toastId)){
                    this.setState({
                        toastId : toast.error("Hasła nie są identyczne!", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: false
                      })
                    })
                  }
            } else {
           
                const userResetPassword = {
                    password: this.state.password,
                };
                
                WorkerService.resetPassword(this.props.href, userResetPassword)
                .then(
                    response => {
                      this.setState({
                        message: response.data.message,
                        successful: true
                      });
                    },
                    error => {
                      const resMessage =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();
            
                      this.setState({
                        successful: false,
                        message: resMessage
                      });
                    }
                );
            }
        }
    };


    render() {
    
        return (
            <div>
                <div>
                    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                        Zmień hasło
                    </Button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                        <div className="col-md-12">
                                <Form 
                                    onSubmit={this.handleSubmit} 
                                    style={{display: 'inline'}}
                                    ref={c => {
                                        this.form = c;
                                    }}
                                >
                                    {!this.state.successful && (
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="password">Nowe hasło: </label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required, vpassword]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Powtórz hasło: </label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirmPassword"
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChangeConfirmPassword}
                                                    validations={[required]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-primary btn-block">Zmień hasło</button>
                                            </div>
                                        </div>
                                    )}

                                    {this.state.message && (
                                        <div className="form-group">
                                            <div
                                            className={
                                                this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                            }
                                            role="alert"
                                            >
                                            {this.state.message}
                                            </div>
                                        </div>
                                    )}

                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={c => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                        </div>
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

}