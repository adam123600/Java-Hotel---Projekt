import React, { Component } from "react";
import WorkerService from "../../service/WorkerService";
//import Menu from "../Menu"
import Worker from "./Worker";

export default class AllWorkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allWorkers: [],
        }
    }

    componentDidMount() {
        WorkerService.getAllUsers().then(response => {
            this.setState({allWorkers: response});
        });
        /*axios.get("/api/users/").then(response =>{
            this.setState({
                allWorkers: response.data._embedded.users
            });
        });*/
    }

    render() {
        return(
            <div className="main-container">


                <div className="content">
                    <h2>Pracownicy:</h2>
                    <ul>
                        {this.state.allWorkers.map(worker => (
                            <li key={worker._links.self}>
                                <Worker worker={worker}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}