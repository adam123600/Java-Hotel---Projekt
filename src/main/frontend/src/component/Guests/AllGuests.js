import React, { Component } from "react";

import GuestService from "../../service/GuestService";
import Guest from "./Guest";

export default class AllGuests extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
                allGuests: []
            }
        }


    componentDidMount() {
    GuestService.getAllGuests().then(
        response => {
            this.setState( {
                allGuests: response
            });
        }
    )
    }

    render() {
        return(
            <div className="main-container">
                <div className="content">
                    <h2>Goście:</h2>
                    <ul>
                        {
                            this.state.allGuests.map(
                                guest => (
                                    <li key={guest.firstName}>
                                        <Guest guest={guest}/>
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