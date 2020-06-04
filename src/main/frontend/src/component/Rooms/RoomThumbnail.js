import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import {Link} from 'react-router-dom';
import Room from "./Room";

const img = "/RoomOccupancy/";

export default class RoomThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: img + '01.png',
        }
    }

    componentDidMount() {
        RoomService.getRoomOccupancyImg(this.props.room).then(result => {
            this.setState({
                img: result
            });
        });
    }

    render() {
        var roomClass = this.props.room.currentNumberOfGuests ? 'roomThumbnail occupied' : 'roomThumbnail free';

        return(
            <Link to={{pathname: `/rooms/${this.props.room.roomName}`, state: {room: this.props.room, img: this.state.img}}} >
                <div className={roomClass}>
                    <p>{this.props.room.roomName}</p>
                    <img src={this.state.img}/>
                </div>
            </Link>
        )
    }
}