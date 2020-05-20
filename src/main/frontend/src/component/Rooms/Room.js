import React, { Component } from "react";
import RoomService from "../../service/RoomService"

const img = "/RoomOccupancy/";

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomStandard: {},
            roomCapacity: "",
            img: '01.png',
        }
    }

    componentDidMount() {
        console.log(this.props.room);
        RoomService.getRoomStandard(this.props.room).then(result => {
            console.log(result);
            this.setState({
                roomStandard: result,
                img: img + this.props.room.currentNumberOfGuests + result.max_capacity + '.png',
            });
            console.log("img:");
            console.log(this.state.img);
        });
    }

    render() {
        var roomClass = this.props.room.currentNumberOfGuests ? 'room occupied' : 'room free';

        return(
            <a href="#">
            <div className={roomClass}>
                <p>{this.props.room.roomName}</p>
                <img src={this.state.img}/>
            </div>
            </a>
        )
    }
}