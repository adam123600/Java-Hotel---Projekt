import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import Room from "./Room"

export default class AllRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
        }
        RoomService.getAllRooms().then(result => {
            this.setState({allRooms: result})
        });
    }

    render() {
        return(
            <div className="main-container">
                <div className="content">
                    {this.state.allRooms.map(room => (
                        <li key={room.roomName}>
                            <Room room={room}/>
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}