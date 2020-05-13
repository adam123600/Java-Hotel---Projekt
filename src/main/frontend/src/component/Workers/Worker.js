import React, { Component } from "react";
import AuthService from "../../service/AuthService";
import EditWorker from "./EditWorker";

export default class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            worker: [],
            renderEdit: false,
        }
        this.renderEdit = this.renderEdit.bind(this);
    }

    renderEdit() {
        this.setState({renderEdit: !this.state.renderEdit});
    }

    render() {
        return(
            <div style={{padding: '25px'}}>
                <h3>Imię: {this.props.worker.firstname} Nazwisko: {this.props.worker.lastname}</h3>
                <button onClick={this.renderEdit}>Edytuj dane</button>
                {this.state.renderEdit && <EditWorker href={this.props.worker._links.self.href} currentWorker={this.props.worker}/>}
                <p>Nazwa użytkownika: {this.props.worker.username}</p>
                <p>Email: {this.props.worker.email}</p>
                <p>Telefon: {this.props.worker.phonenumber}</p>
            </div>
        )
    }
}