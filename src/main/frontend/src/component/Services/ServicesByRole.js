import React, { Component } from "react";
import AuthService from "../../service/AuthService";
import {Button} from "reactstrap";
import NotificationService from "../../service/NotificationService";
import {Row, Col, Table} from 'reactstrap';


export default class ServicesByRole extends Component {
    constructor(props) {
        super(props);
        var curUser = AuthService.getCurrentUser()
        this.state = {
            currentRole: curUser.roles[0],
            allNotifications: [],
            allNotifications1: [],
            typeOfNot: 4,
            showNotifications: false,
            showNotifications1: false
        }

        this.handleDeleteNotification = this.handleDeleteNotification.bind(this);
    }

    handleDeleteNotification(id) {
        NotificationService.deleteNotificationById(id);
        window.location.reload(true);
    }

    componentDidMount() {

        if (this.state.currentRole === "ROLE_REPAIRMAN" || this.state.currentRole === "ROLE_MANAGER") {
            NotificationService.getAllNotificationsByNotificationTypeId(4).then(
                response => {
                   this.setState({
                       showNotifications: true,
                        allNotifications: response.data
                    });
                })
        }

        if(this.state.currentRole === "ROLE_CLEANER"  || this.state.currentRole === "ROLE_MANAGER") {
            NotificationService.getAllNotificationsByNotificationTypeId(3).then(
                response => {
                    this.setState({
                        showNotifications1: true,
                        allNotifications1: response.data
                    });
                })
        }

    }



    render() {

        return(
            <div>
                <Row>
                    <Col sm="12">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Typ</th>
                                    <th>Opis</th>
                                    <th>Pokój</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {this.state.showNotifications && this.state.allNotifications.map(n => {
                                if(n.notType.type === "FLAW")
                                    return(
                                        <tbody>
                                            <tr>
                                                <td>Usterka</td>
                                                <td>{n.description}</td>
                                                <td>{n.room.roomName}</td>
                                                <td>
                                                    <Button style={{backgroundColor: '#f99cab'}}
                                                            onClick={() => this.handleDeleteNotification(n.id)}>
                                                        Usuń
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                            })}
                            {this.state.showNotifications1 && this.state.allNotifications1.map(n => {
                                if(n.notType.type === "ROOM_CLEANING")
                                    return(
                                        <tbody>
                                        <tr>
                                            <td>Sprzątanie</td>
                                            <td>{n.description}</td>
                                            <td>{n.room.roomName}</td>
                                            <td>
                                                <Button style={{backgroundColor: '#f99cab'}}
                                                        onClick={() => this.handleDeleteNotification(n.id)}>
                                                    Usuń
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    )
                            })}
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}