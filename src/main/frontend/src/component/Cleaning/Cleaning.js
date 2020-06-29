import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import Room from "../Rooms/Room"
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import AuthService from "../../service/AuthService";

export default class Cleaning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            roomNames: [],
            roomClean: [],
            disableStatusButton: true,
        }

        RoomService.getAllRooms1().then(res => {
            this.setState({allRooms: res});
            console.log(res);
        });

        this.onCleanedButton = this.onCleanedButton.bind(this);


    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user.roles.includes("ROLE_MANAGER") ||  user.roles.includes("ROLE_CLEANER")) {
            console.log(user.roles);
            this.setState({
                disableStatusButton: false
            });
        }
    }

    componentDidUpdate() {
        RoomService.getAllRooms1().then(res => {
            this.setState({allRooms: res});
        });
    }

    onCleanedButton = (name, status) => {
        console.log(name);
        console.log(status);

        let newRoom = this.state.allRooms.filter( room => {
            if( room.roomName === name ) { return room; }
        })

        console.log(newRoom[0]);
        if( status === "NIE" ){
            newRoom[0].cleaned = true;
        }
        if( status === "TAK" ){
            newRoom[0].cleaned = false;
        }
        console.log(newRoom[0]);

        RoomService.updateRoomById( newRoom[0].id, newRoom[0] );
    }

    render() {
        this.roomNames = this.state.allRooms.map(room => room.roomName );
        this.roomClean = this.state.allRooms.map( room => {
            if(room.cleaned) {
                return "TAK";
            } else {
                return "NIE";
            }
        });
        //console.log(this.roomClean);
        return(
            <div>
                <h1>Stan czystości pokojów</h1>
                <Row>
                    <Col><h2>Numer pokoju</h2></Col>
                    <Col><h2>Czy jest sprzątany?</h2></Col>
                    <Col><h2>Zmień status posprzątania</h2></Col>
                </Row>
                {this.roomNames.map( (name, indexName) => {
                    let status;
                    return (
                        <div>
                            <Row>
                                <Col><h3 key={indexName}>{name}</h3></Col>
                                {this.roomClean.map( (clean, indexClean) => {
                                    if( indexName === indexClean ) {
                                        status = clean;
                                        return (
                                            <div>
                                                <Col><h3 key={indexClean}>{clean}</h3></Col>
                                            </div>
                                        )}
                                })}
                                <Col>
                                    <button className="btn btn-primary"
                                     style={{margin: '10px'}}
                                     disabled={this.state.disableStatusButton}
                                     onClick={this.onCleanedButton.bind(this, name, status)}>
                                     Zmień status
                                     </button>
                                </Col>
                            </Row>
                        </div>
                    )
                })}
             </div>
        )

    }
}