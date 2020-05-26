import React, { Component } from "react";
import WorkerService from "../../service/WorkerService";
//import Menu from "../Menu"
import Worker from "./Worker";

export default class AllWorkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allWorkers: [],
            allRoles: [],
        }
        WorkerService.getAllWorkers().then(result => {
            this.setState({allWorkers: result});
        });
        WorkerService.getAllRoles().then(result => {
            this.setState({allRoles: result});
        });
    }

    render() {
        return(
            <div className="main-container">
                <div className="content">
                    <h2>Pracownicy:</h2>
                    <ul>
                        {this.state.allWorkers.map(worker => (
                            <li key={worker._links.self}>
                                <Worker worker={worker} allRoles={this.state.allRoles}/>
                                <button onClick={() => { WorkerService.deleteWorker(worker); window.location.reload(); } }>Usuń pracownika</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}