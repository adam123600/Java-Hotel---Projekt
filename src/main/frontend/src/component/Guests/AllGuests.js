import React, { Component } from "react";

import GuestService from "../../service/GuestService";
import Guest from "./Guest";

export default class AllGuests extends React.Component{
    constructor(props) {
            super(props);
            this.state = {
                allGuests: [],
                unmount: false,
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
        console.log(this.state.allGuests)
        return(
            
            <div className="main-container">
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