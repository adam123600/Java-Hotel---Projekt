import React, { Component } from "react";
import {Link, NavLink} from "react-router-dom";
import { Button } from "reactstrap";
import './Guest.css'

export  default class Guest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guestID: this.props.guest.id,
            renderDetails: false
        }

        this.renderDetails = this.renderDetails.bind(this);
    }

    renderDetails() {
        this.setState({renderDetails: !this.state.renderDetails});
    }


    render() {
        return (
            <tr>
                <td><h3>{this.props.guest.firstName}</h3></td>   
                <td><h3>{this.props.guest.lastName}</h3></td>
                <td>
                    <Link to={{
                        pathname:`/guests/${this.state.guestID}`,
                        props:{guest: this.props.guest}
                                }}>
                        <button className="show-data-button">Szczegółowe dane</button>
                    </Link>
                </td>
            </tr>
        )
    }
}