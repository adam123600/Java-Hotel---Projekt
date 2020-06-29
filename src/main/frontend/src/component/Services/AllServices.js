import React, { Component } from "react";
import ServicesService from "../../service/ServicesService";
import AuthService from "../../service/AuthService";
import {Button} from "reactstrap";

export default class AllServices extends React.Component {
    constructor(props) {
        super(props);
        var curUser = AuthService.getCurrentUser()
        this.state = {
            allServices: [],
            serviceTypes: [],
            currentRole: curUser.roles[0],
        };

        ServicesService.getAllServices1().then(res => {
            this.setState({allServices: res});
        });
        ServicesService.getAllServiceTypes().then(res => {
            this.setState({serviceTypes: res});
        });

        this.handleDeleteService = this.handleDeleteService.bind(this);
    }

    handleDeleteService(service) {
        ServicesService.deleteService(service);
        window.location.reload(true);
    }

    render() {
        var {serviceTypes} = this.state;

        if(this.state.currentRole === "ROLE_KITCHEN_MANAGER") {
            serviceTypes = serviceTypes.filter(type => {
                return type.type === "KOLACJA" || type.type === "OBIAD";    // trzeba uzupełnić jak się doda więcej tego do bazy
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
                {allServices.map(s => (
                    <div>
                        <h3>{s.type}</h3>
                        <table style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <tr>
                            <th>Opis</th>
                            <th>Pokój</th>
                            <th></th>
                        </tr>
                        {s.services.map(service => (
                                <tr>
                                    <td>{service.description}</td>
                                    <td>{service.room.roomName}</td>
                                    <td>
                                        <Button style={{backgroundColor: '#f99cab'}} onClick={() => this.handleDeleteService(service)}>
                                            Usuń
                                        </Button>
                                    </td>
                                </tr>
                        ))}
                            </table>
                    </div>
                ))}
            </div>
        )
    }
}