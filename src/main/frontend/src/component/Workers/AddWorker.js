import React, { Component } from "react";

import AuthService from "../../service/AuthService";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import WorkerService from "../../service/WorkerService";
import axios from "axios";
import authHeader from "../../service/AuthHeader";
import Worker from "./Worker";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class AddWorker extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);


        this.state = {
            username: "",
            email: "",
            password: "",
            role: "", //this.props.workerRole,
            successful: false,
            message: "",
            roleHref: "",
            firstname: "",
            lastname: "",
            phonenumber: "",
            //currentWorkerID: 0,
            allWorkers: [],
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            roleHref: e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }
    onChangePhoneNumber(e) {
        this.setState({
            phonenumber: e.target.value
        });
    }


    handleSelect(e) {
        this.setState({
            roleHref: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        // const addedWorker = {
        //     username: this.state.username,
        //     email: this.state.email,
        //     password: this.state.password,
        //     firstname: this.state.firstname,
        //     lastname: this.state.lastname,
        //     phonenumber: this.state.phonenumber
        // };

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.firstname,
                this.state.lastname,
                this.state.phonenumber,
            ).then(
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
 /*       const role = {
            _links: {
                roles: [
                    {
                        href: this.state.roleHref
                    }
                ]
            }
        };
        console.log(role);
        axios.put('/api/users/' + {currentWorkerID} + '/roles', role,{headers: authHeader()});
        */window.location.reload();


    }

    openForm(){
        document.getElementById("add-user-form").style.display = "block";
    }

    closeForm(){
        document.getElementById("add-user-form").style.display = "none";
    }

    render() {
        return (
            <div>
                {/*<button className="btn btn-primary" style={{marginTop: 25}} onClick={this.openForm}>Dodaj nowego użytkownika</button>*/}

                <div className="form-group form-popup" id="add-user-form" >
                    <div className="card" style={{width: 500}}>
                        <Form
                            onSubmit={this.handleRegister}

                            ref={c => {this.form = c;}}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Nazwa użytkownika</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required, vusername]}
                                        />
                                    </div>

                                        <div className="form-group">
                                            <label htmlFor="firstname">Imię</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={this.state.firstname}
                                                onChange={this.onChangeFirstName}
                                                validations={[required, vusername]}
                                            />
                                        </div>

                                            <div className="form-group">
                                                <label htmlFor="lastname">Nazwisko</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    value={this.state.lastname}
                                                    onChange={this.onChangeLastName}
                                                    validations={[required, vusername]}
                                                />
                                            </div>

                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Hasło</label>
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
                                            <label htmlFor="username">Numer telefonu</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={this.state.phonenumber}
                                                onChange={this.onChangePhoneNumber}
                                            />
                                        </div>

                                   {/* <div className="form-group">
                                        <label htmlFor="role">Rola</label>

                                        <select className="form-control form-control-sm" onChange={this.onChangeRole}>
                                             {this.props.allRoles.map(role => {
                                                return <option key={role._links.self.href} value={role._links.self.href}>{WorkerService.roleNameToPolish(role.name)}</option>
                                            })}
                                        </select>
                                    </div>*/}<br/>

                                    <div className="form-group">
                                        <button style={{margin: 15}} className="btn btn-primary">Dodaj pracownika</button>
                                        <button className="btn btn-primary" onClick={this.closeForm}>Anuluj</button>
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
                </div>
            </div>
        );
    }
}