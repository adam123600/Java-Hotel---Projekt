import React, { Component } from "react";
import WorkerService from "../../service/WorkerService";
//import Menu from "../Menu"
import Worker from "./Worker";
import axios from 'axios';

export default class AllWorkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allWorkers: [],
            allRoles: [],
            allUsersNoLinks: [],
        }
        WorkerService.getAllWorkers().then(result => {
            this.setState({allWorkers: result});
        });
        WorkerService.getAllRoles().then(result => {
            this.setState({allRoles: result});
        });
        WorkerService.getWorkersNoLinks().then(result => {
            this.setState({allUsersNoLinks: result});
        });
    }

    render() {
        const {allWorkers, allRoles} = this.state;

        return(
            <div className="main-container">


                <div className="content">
                    <h2>Pracownicy:</h2>

                    {this.state.allRoles.map(role => {
                        return (
                            <div>
                                <h1>{WorkerService.roleNameToPolish(role.name)}</h1>
                                <ul>
                                    {this.state.allUsersNoLinks.map(user => {
                                        return user.roles.map( r => {
                                            if(r.name == role.name) {
                                                return allWorkers.map( worker => {
                                                    if( worker.username == user.username) {
                                                        return (
                                                            <li key={worker._links.self}>
                                                                <Worker worker={worker} allRoles={allRoles}/>
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        }) 
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}