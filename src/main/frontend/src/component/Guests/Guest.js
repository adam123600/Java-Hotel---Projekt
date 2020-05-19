import React, { Component } from "react";
import GuestService from "../../service/GuestService";

export  default class Guest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderEdit: false
        }

        this.renderEdit = this.renderEdit.bind(this);
    }

    renderEdit() {
        this.setState({renderEdit: !this.state.renderEdit});
    }


    render() {
        return (
            <div style={{padding: '25px'}}>
                <h5>Imię: {this.props.guest.firstName} <br/>
                    Nazwisko: {this.props.guest.lastName}</h5>
                <button onClick={this.renderEdit}>Szczegółowe dane</button>
            </div>
        )
    }
}