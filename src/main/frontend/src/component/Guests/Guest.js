import React, { Component } from "react";
import GuestService from "../../service/GuestService";
import GuestDetails from "./GuestDetails";
import {Link, NavLink} from "react-router-dom";

export  default class Guest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guestID: this.getGuestId(),
            renderDetails: false
        }

        this.renderDetails = this.renderDetails.bind(this);
        this.getGuestId = this.getGuestId(this);
    }

    getGuestId = () => {
        let href = this.props.guest._links.self.href;
        let reGEXP = /[0-9]*$/;
        return href.match(reGEXP).toString();
    }

    renderDetails() {
        this.setState({renderDetails: !this.state.renderDetails});
    }

    render() {
        return (
            <div style={{padding: '25px'}}>
                <h5>Imię: {this.props.guest.firstName} <br/>
                    Nazwisko: {this.props.guest.lastName}</h5>
                <Link to={{
                    pathname:`/guests/${this.state.guestID}`,
                    props:{guest: this.props.guest}
                            }}>
                    <button>Szczegółowe dane</button>
                </Link>
            </div>
        )
    }
}