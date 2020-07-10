import React, { Component } from "react";
import ServicesService from "../../service/ServicesService";
import AuthService from "../../service/AuthService";
import {Button, Spinner, Row, Col, Table} from "reactstrap";

export default class AllServices extends React.Component {
    constructor(props) {
        super(props);
        var curUser = AuthService.getCurrentUser()
        this.state = {
            allServices: [],
            serviceTypes: [],
            currentRole: curUser.roles[0],
            loading: true
        };

        ServicesService.getAllServices1().then(res => {
            this.setState({allServices: res});
        });
        ServicesService.getAllServiceTypes().then(res => {
            this.setState({serviceTypes: res,
            loading: false
            });
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


        return(
            <div>
                {this.state.loading && <Spinner animation="border"/>}
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
                            <tbody>
                            {allServices.map(s => (
                                s.services.map(service => (
                                    <tr>
                                        <td>{s.type}</td>
                                        <td>{service.description}</td>
                                        <td>{service.room.roomName}</td>
                                        <td>
                                            <Button style={{backgroundColor: '#f99cab'}} onClick={() => this.handleDeleteService(service)}>
                                                Usuń
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}