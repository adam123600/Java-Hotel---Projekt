import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import Room from "../Rooms/Room"
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';

export default class Cleaning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            roomNames: [],
            roomClean: [],
        }

        RoomService.getAllRooms1().then(res => {
            this.setState({allRooms: res});
            console.log(res);
        });

        this.onCleanedButton = this.onCleanedButton.bind(this);
        }

    onCleanedButton = (name) => {
        let newRoom = this.state.allRooms.filter( room => {
             room.roomName.match(name);
        })
        newRoom.cleaned = true;
        RoomService.updateRoomById( newRoom.id, newRoom );
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
        console.log(this.roomClean);
        return(
            <div>
                <h1>Stan czystości pokojów</h1>
                <Row>
                    <Col><h2>Numer pokoju</h2></Col>
                    <Col><h2>Czy był sprzątany?</h2></Col>
                    <Col><h2>Oznacz postrzątanie</h2></Col>
                </Row>
                {this.roomNames.map( (name, indexName) => {
                    return (
                        <div>
                            <Row>
                                <Col><h3 key={indexName}>{name}</h3></Col>
                                {this.roomClean.map( (clean, indexClean) => {
                                    if( indexName === indexClean ) {
                                        return (
                                            <div>
                                                <Col><h3 key={indexClean}>{clean}</h3></Col>
                                            </div>
                                        )}
                                })}
                                <Col><button className="btn btn-primary" style={{margin: '10px'}} onClick={this.onCleanedButton(name)}>Wysprzątane</button></Col>
                            </Row>
                        </div>
                    )
                })}
             </div>
        )

    }
}