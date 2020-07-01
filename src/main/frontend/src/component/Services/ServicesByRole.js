import React, { Component } from "react";
import ServicesService from "../../service/ServicesService";
import AuthService from "../../service/AuthService";
import {Button} from "reactstrap";
import NotificationService from "../../service/NotificationService";
import {Row, Col, Table} from 'reactstrap';

const FLAW = 4;
const ROOM_CLEANING = 3;

export default class ServicesByRole extends Component {
    constructor(props) {
        super(props);
        var curUser = AuthService.getCurrentUser()
        this.state = {
            allServices: [],
            serviceTypes: [],
            currentRole: curUser.roles[0],
            allNotifications: [],
            typeOfNot: 3,
            showNotifications: true,
            showServices: false
        };

        ServicesService.getAllServices1().then(res => {
            this.setState({allServices: res});
        });
        ServicesService.getAllServiceTypes().then(res => {
            this.setState({serviceTypes: res});
        });
        /*NotificationService.getAllNotifications().then( res => {
            this.setState({allNotifications: res})
        })*/

        this.handleDeleteService = this.handleDeleteService.bind(this);
        this.handleDeleteNotification = this.handleDeleteNotification.bind(this);
    }

    handleDeleteService(service) {
        ServicesService.deleteService(service);
        window.location.reload(true);
    }

    handleDeleteNotification(id) {
        NotificationService.deleteNotificationById(id);
        window.location.reload();
    }



    componentDidMount() {

        if (this.state.currentRole === "ROLE_REPAIRMAN" || this.state.currentRole === "ROLE_MANAGER") {
            this.setState({
                showNotifications: true,
                typeOfNot: FLAW
            })
            console.log("type of not")
            console.log(this.state.typeOfNot)
            console.log("show Notifications")
            console.log(this.state.showNotifications)
            NotificationService.getAllNotificationsByNotificationTypeId(this.state.typeOfNot).then(
                response => {
                    this.setState({
                        allNotifications: response.data
                    });
                })
        }


        if(this.state.currentRole === "ROLE_CLEANER"  /*|| this.state.currentRole === "ROLE_MANAGER"*/) {
            this.setState({
                showNotifications: true,
                typeOfNot: ROOM_CLEANING
            })
            NotificationService.getAllNotificationsByNotificationTypeId(this.state.typeOfNot).then(
                response => {
                    this.setState({
                        allNotifications: response.data
                    });
                })
        }
/*
        if (this.state.currentRole === "ROLE_MANAGER") {
            this.setState({
                showNotifications: true,
                typeOfNot: FLAW
            })
            console.log(this.state.typeOfNot)

            NotificationService.getAllNotificationsByNotificationTypeId(this.state.typeOfNot).then(
                response => {
                    this.setState({
                        allNotifications: response.data
                    });
                })
        }*/


        /*allNotifications.push({
        type: serviceTypes[i].type,
       services: services,
   });*/

        console.log(this.state.allNotifications)

    }



    render() {

        var {serviceTypes} = this.state;
        var showServices = false;
        if(this.state.currentRole === "ROLE_KITCHEN_MANAGER") {
            showServices = true
            serviceTypes = serviceTypes.filter(type => {
                return type.type === "KOLACJA" || type.type === "OBIAD";
            })
        }

        if(this.state.currentRole === "ROLE_BUTLER"  || this.state.currentRole === "ROLE_MANAGER") {
            showServices = true
            serviceTypes = serviceTypes.filter(type => {
                return type.type === "KOLACJA" || type.type === "OBIAD" || type.type === "ALKOHOL";
            })
        }
        console.log("pokaz services")
        console.log(showServices)
        var allServices = [];

        for(var i = 0; i < serviceTypes.length; i++) {
            var services = this.state.allServices.filter(service => {
                return service.serviceType.type == serviceTypes[i].type;
            });
            allServices.push({
                type: serviceTypes[i].type,
                services: services,
            });
        };
        console.log(allServices)


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
                {showServices &&
                            allServices.map(s => (
                                    s.services.map(service => (
                                        <tbody>
                                        <tr>
                                            <td>{s.type}</td>
                                            <td>{service.description}</td>
                                            <td>{service.room.roomName}</td>
                                            <td>
                                                <Button style={{backgroundColor: '#f99cab'}}
                                                        onClick={() => this.handleDeleteService(service)}>
                                                    Usuń
                                                </Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))
                            ))
                }
                {this.state.showNotifications &&
                    this.state.allNotifications.map(n => (
                               <tbody>
                                    <tr>
                                        <td>{n.notType.type}</td>
                                        <td>{n.description}</td>
                                        <td>{n.room.roomName}</td>
                                        <td>
                                            <Button style={{backgroundColor: '#f99cab'}}
                                                    onClick={() => this.handleDeleteNotification.bind(this, n.id)}>
                                                Usuń
                                            </Button>
                                        </td>
                                    </tr>
                               </tbody>
                        ))

                }
                    </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}