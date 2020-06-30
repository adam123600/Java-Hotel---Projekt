import React, { Component } from "react";
import ServicesService from "../../service/ServicesService";
import AuthService from "../../service/AuthService";
import {Button} from "reactstrap";
import NotificationService from "../../service/NotificationService";

const FLAW = 4;
const ROOM_CLEANING = 3;

export default class ServicesByRole extends React.Component {
    constructor(props) {
        super(props);
        var curUser = AuthService.getCurrentUser()
        this.state = {
            allServices: [],
            serviceTypes: [],
            currentRole: curUser.roles[0],
            allNotifications: [],
            typeOfNot: 1,
            showNotifications: false,
            showServices: false
        };

        ServicesService.getAllServices1().then(res => {
            this.setState({allServices: res});
        });
        ServicesService.getAllServiceTypes().then(res => {
            this.setState({serviceTypes: res});
        });
        NotificationService.getAllNotifications().then( res => {
            this.setState({allNotifications: res})
        })

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

        if(this.state.currentRole === "ROLE_REPAIRMAN") {
            this.setState({
                showNotifications: true,
                typeOfNot: FLAW
            })
        }

        if(this.state.currentRole === "ROLE_CLEANER") {
            this.setState({
                showNotifications: true,
                typeOfNot: ROOM_CLEANING
            })
        }

        NotificationService.getAllNotificationsByNotificationTypeId(this.state.typeOfNot).then(
            response => {
                this.setState({
                    allNotifications: response.data
                });
            })
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

        if(this.state.currentRole === "ROLE_BUTLER") {
            showServices = true
            serviceTypes = serviceTypes.filter(type => {
                return type.type === "KOLACJA" || type.type === "OBIAD" || type.type === "ALKOHOL";
            })
        }

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
                {showServices &&
                    <div>
                        {this.state.allServices.map(s => (
                            <div>
                                <table style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}>
                                    <tr>
                                        <th>Typ</th>
                                        <th>Opis</th>
                                        <th>Pokój</th>
                                        <th></th>
                                    </tr>
                                    {s.services.map(service => (
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
                                    ))}
                                </table>
                            </div>
                        ))}
                    </div>
                }
                {this.state.showNotifications &&
                    <div>
                        {this.state.allNotifications.map(n => (
                            <div>
                                <table style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}>
                                    <tr>
                                        <th>Opis</th>
                                        <th>Pokój</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td>{n.description}</td>
                                        <td>{n.room.roomName}</td>
                                        <td>
                                            <Button style={{backgroundColor: '#2b2b2b'}}
                                                    onClick={() => this.handleDeleteNotification.bind(this, n.id)}>
                                                Usuń
                                            </Button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}