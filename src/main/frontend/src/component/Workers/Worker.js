import React, { Component } from "react";
import AuthService from "../../service/AuthService";
import EditWorker from "./EditWorker";
import WorkerService from "../../service/WorkerService";
import ChangePassword from "./ChangePassword";

export default class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderEdit: false,
            workerRole: "",
            currentUser: false,
            isManager: false
        }
        WorkerService.getWorkerRole(this.props.worker).then(result => {
            this.setState({workerRole: result});
        });
        this.renderEdit = this.renderEdit.bind(this);
    }

    componentDidMount() {
        this.state.currentUser = AuthService.getCurrentUser();
        if (this.state.currentUser) {
            this.setState({
                isManager: this.state.currentUser.roles.includes("ROLE_MANAGER")
            });
        }
    }

    renderEdit() {
        this.setState({renderEdit: !this.state.renderEdit});
    }

    render() {

        const { isManager, currentUser } = this.state;
        return(
            <div style={{padding: '25px'}}>
                <h3>Imię: {this.props.worker.firstname} Nazwisko: {this.props.worker.lastname}</h3>
                { (isManager || 
                    (currentUser.username == this.props.worker.username)
                    ) 
                    && (
                        <div style={{display: 'inline-flex'}}>
                            <button onClick={this.renderEdit}>Edytuj dane</button>
                            <ChangePassword href={this.props.worker._links.self.href} currentWorker={this.props.worker}/>
                        </div>
                    )
                }

        
                {this.state.renderEdit && <EditWorker href={this.props.worker._links.self.href} currentWorker={this.props.worker} allRoles={this.props.allRoles} workerRole={this.state.workerRole}/>}
                <p>Nazwa użytkownika: {this.props.worker.username}</p>
                <p>Email: {this.props.worker.email}</p>
                <p>Telefon: {this.props.worker.phonenumber}</p>
                <p>Rola: {WorkerService.roleNameToPolish(this.state.workerRole)}</p>
                
            </div>
        )
    }
}