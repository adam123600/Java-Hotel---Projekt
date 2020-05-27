import React, { Component } from "react";
import AuthService from "../../service/AuthService";
import EditWorker from "./EditWorker";
import WorkerService from "../../service/WorkerService";
import ChangePassword from "./ChangePassword";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Worker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderEdit: false,
            workerRole: "",
            currentUser: false,
            isManager: false,
            modal: false
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

        const { isManager, currentUser, modal } = this.state;
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Dane</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{this.props.worker.firstname}</td>
                    <td>{this.props.worker.lastname}</td>
                    <td>
                        <Button style={{backgroundColor: '#f99cab'}} onClick={() => { this.setState( {modal: !this.state.modal })}}>
                            Pokaż szczegółowe dane
                        </Button>
                        <Modal isOpen={modal} toggle={() => { this.setState( {modal: !this.state.modal })}}>
                            <ModalHeader toggle={() => { this.setState( {modal: !this.state.modal })}}>Dane</ModalHeader>
                            <ModalBody>
                                {!this.state.renderEdit && 
                                    <ListGroup>
                                        <ListGroupItem>Imię: {this.props.worker.firstname} </ListGroupItem>
                                        <ListGroupItem>Nazwisko: {this.props.worker.lastname}</ListGroupItem>
                                        <ListGroupItem>Nazwa użytkownika: {this.props.worker.username}</ListGroupItem>
                                        <ListGroupItem>Email: {this.props.worker.email}</ListGroupItem>
                                        <ListGroupItem>Telefon: {this.props.worker.phonenumber}</ListGroupItem>
                                        <ListGroupItem>Rola: {WorkerService.roleNameToPolish(this.state.workerRole)}</ListGroupItem>                                    
                                    </ListGroup>
                                }
                                {this.state.renderEdit && <EditWorker href={this.props.worker._links.self.href} currentWorker={this.props.worker} allRoles={this.props.allRoles} workerRole={this.state.workerRole}/>}                             

                            </ModalBody>
                            <ModalFooter>
                                { (isManager || 
                                    (currentUser.username == this.props.worker.username)
                                    ) 
                                    && (
                                        <table>
                                                <tr>
                                                    <td>
                                                        <Button color="danger" onClick={this.renderEdit}>Edytuj dane</Button>
                                                    </td>
                                                    <td>
                                                        <ChangePassword href={this.props.worker._links.self.href} currentWorker={this.props.worker}/>
                                                    </td>                                           
                                                </tr>
                                        </table>
                                    )
                                }
                            </ModalFooter>
                        </Modal>
                    </td>
                    { isManager &&
                        <td>
                            <Button style={{backgroundColor: '#f99cab'}} 
                                    onClick={() => { WorkerService.deleteWorker(this.props.worker); window.location.reload(); } }>
                                        Usuń pracownika
                            </Button>
                        </td>
                    }
                </tbody>
            </Table>
            
        )
    }
}