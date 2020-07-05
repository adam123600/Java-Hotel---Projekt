import React, { Component } from "react";
import './Guest.css'
import GuestService from "../../service/GuestService";
import Guest from "./Guest";
import {Spinner, Table, Row, Col} from "reactstrap";

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
            <div>
                {this.state.loading && <Spinner animation="border"/>}
                <div>
                    <h1 className="main-header">Goście:</h1>
                            <Table striped>
                                <thead>
                                    <th><h2 className="subheader">Imię</h2></th>
                                    <th><h2 className="subheader">Nazwisko</h2></th>
                                    <th></th>
                                </thead>
                                <tbody>
                                {
                                    this.state.allGuests.map(
                                        guest => (
                                                <Guest guest={guest} />
                                        )
                                    )
                                }
                                </tbody>
                            </Table>
                </div>
            </div>
        )
    }
}