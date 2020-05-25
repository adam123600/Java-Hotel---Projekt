import React, { Component } from "react";
import WorkerService from "../../service/WorkerService";
//import Menu from "../Menu"
import Worker from "./Worker";
import AddWorker from "./AddWorker";

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

        this.renderAdd = this.renderAdd.bind(this);
    }

    renderAdd() {
        this.setState({renderAdd: !this.state.renderAdd})
    }

    render() {
        return(
            <div className="main-container">
                <div className="content">
                    <button className="btn btn-primary" style={{marginTop: 25, marginBottom : 25}} onClick={this.renderAdd}>Dodaj nowego użytkownika</button>
                    {this.state.renderAdd && <AddWorker allRoles={this.state.allRoles} />}
                    {/*href={this.props.roles._links.self.href}/>}*/}
                    <h2>Pracownicy:</h2>
                    <ul>
                        {this.state.allWorkers.map(worker => (
                            <li key={worker._links.self}>
                                <Worker worker={worker} allRoles={this.state.allRoles}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}