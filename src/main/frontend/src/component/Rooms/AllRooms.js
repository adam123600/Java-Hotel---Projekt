import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import RoomThumbnail from "./RoomThumbnail"
import SearchRoom from "../Search/SearchRoom";


export default class AllRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            onlyEmpty: true,
        }
        RoomService.getAllRooms().then(result => {
            this.setState({allRooms: result})
        });
    }

    render() {
        let roomThumbnails;
        if(this.state.onlyEmpty) {
            roomThumbnails = this.state.allRooms.map(room => (
                    <div key={room.id}>
                        <RoomThumbnail room={room}/>
                    </div>
                ))
        }
        else
        {
            roomThumbnails = this.state.allRooms.map(room => (
                <div key={room.id}>
                    {room.currentNumberOfGuests == 0 && <RoomThumbnail room={room}/>}
                </div>
            ))
        }


        return(
            <div className="main-container">
                <div className="content">
                    <SearchRoom/>
                    <input type="checkbox" onClick={() => this.setState({onlyEmpty: !this.state.onlyEmpty})}></input>
                    <label>Tylko wolne pokoje</label>
                    {roomThumbnails}
                </div>
            </div>
        )
    }
}