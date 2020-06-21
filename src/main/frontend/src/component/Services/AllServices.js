import React, { Component } from "react";
import ServicesService from "../../service/ServicesService";

export default class AllServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allServices: [],
            serviceTypes: [],
        };
        ServicesService.getAllServices1().then(res => {
            this.setState({allServices: res});
        });
        ServicesService.getAllServiceTypes().then(res => {
            this.setState({serviceTypes: res});
        });
    }

    render() {
        var allServices = [];

        for(var i = 0; i < this.state.serviceTypes.length; i++) {
            var services = this.state.allServices.filter(service => {
                return service.serviceType.type == this.state.serviceTypes[i].type;
            });
            allServices.push({
                type: this.state.serviceTypes[i].type,
                services: services,
            });
        };

        console.log(allServices)

        return(
            <div>
                {allServices.map(s => (
                    <div>
                        <h3>{s.type}</h3>
                        {s.services.map(service => (
                            <p>{service.description}</p>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}