import React, { Component } from "react";
import RoomService from "../../service/RoomService"

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomStandard: [],
        }

        RoomService.getRoomStandard(this.props.room).then(result => {
            this.setState({roomStandard: result});
        });
    }

    render() {
        return(
            <div className="room">
                <p>Numer pokoju: {this.props.room.roomName}</p>
            </div>
        )
    }
}