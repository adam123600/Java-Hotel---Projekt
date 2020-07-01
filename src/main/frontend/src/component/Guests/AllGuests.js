import React, { Component } from "react";

import GuestService from "../../service/GuestService";
import Guest from "./Guest";
import {Spinner} from "reactstrap";

export default class AllGuests extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
                allGuests: [],
                unmount: false,
                loading: true
            }
        }

    componentDidMount() {
        
        GuestService.getAllGuests1().then(
        response => {
            this.setState( {
                allGuests: response, 
                loading: false
            });
        }
    )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.history.action.toString() === "PUSH"){
            GuestService.getAllGuests().then(
                response => {
                    this.setState( {
                        allGuests: response
                    });
                });
        }
    }


    render() {
        return(
            <div className="main-container">
                {this.state.loading && <Spinner animation="border"/>}
                <div className="content">
                    <h2>Goście:</h2>
                    <ul>
                        {
                            this.state.allGuests.map(
                                guest => (
                                    <li key={guest.id}>
                                        <Guest guest={guest} />
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}