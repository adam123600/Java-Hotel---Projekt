import React, { Component } from "react";
import axios from "axios";
import AuthService from "../../service/AuthService";
import authHeader from '../../service/AuthHeader';

export default class EditWorker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.currentWorker.username,
            email: this.props.currentWorker.email,
            firstname: this.props.currentWorker.firstname,
            lastname: this.props.currentWorker.lastname,
            phonenumber: this.props.currentWorker.phonenumber,
            currentWorker: [],
            href: "",
        }
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.href);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.name + ": " + event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();
        const editedWorker = {
            username: this.state.username,
            email: this.state.email,
            password: this.props.currentWorker.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phonenumber: this.state.phonenumber,
        };
        console.log(editedWorker);
        axios.put(this.props.href, editedWorker, {headers: authHeader()});
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                    <label>Imię:</label>
                    <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                    <label>Nazwisko:</label>
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                    <label>Telefon:</label>
                    <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange}/>
                    <input type="submit" value={'Zapisz zmiany'}/>
                </form>
            </div>
        )
    }
}