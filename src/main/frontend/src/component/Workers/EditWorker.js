import React, { Component } from "react";
import axios from "axios";
import AuthService from "../../service/AuthService";
import authHeader from '../../service/AuthHeader';
import WorkerService from "../../service/WorkerService";

export default class EditWorker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.currentWorker.username,
            email: this.props.currentWorker.email,
            firstname: this.props.currentWorker.firstname,
            lastname: this.props.currentWorker.lastname,
            phonenumber: this.props.currentWorker.phonenumber,
            role: this.props.workerRole,
            roleHref: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.name + ": " + event.target.value);
    }

    handleSelect(event) {
        this.setState({
            roleHref: event.target.value
        });
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

        const role = {
            _links: {
                roles: [
                    {
                        href: this.state.roleHref
                    }
                ]
            }
        };
        console.log(role);
        axios.put(this.props.href + '/roles', role,{headers: authHeader()});
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
                    <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}/><br/>
                    <label>Telefon:</label>
                    <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange}/>
                    <label>Rola:</label>
                    <select onChange={this.handleSelect}>
                        {this.props.allRoles.map(role => {
                            if(role.name == this.state.role)
                                return <option key={role._links.self.href} value={role._links.self.href} selected>{WorkerService.roleNameToPolish(role.name)}</option>
                            else
                                return <option key={role._links.self.href} value={role._links.self.href}>{WorkerService.roleNameToPolish(role.name)}</option>
                        })}
                    </select>
                    <input type="submit" value={'Zapisz zmiany'}/>
                </form>
            </div>
        )
    }
}