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
        RoomService.getAllRooms().then(res => {
            this.setState({allRooms: res})
        });

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        if(event.target.value === "all") {
            RoomService.getAllRooms().then(res => {
                this.setState({allRooms: res})
            });
        }

        else {
            RoomService.getAllRoomsByFloor(event.target.value).then(res => {
                this.setState({allRooms: res})
            })
        }
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
                    <input className="checkbox" type="checkbox" onClick={() => this.setState({onlyEmpty: !this.state.onlyEmpty})}></input>
                    <label style={{padding: '5px 12px 5px'}}>Tylko wolne pokoje</label>
                    <label style={{padding: '5px 12px 5px 30px'}}>Piętro:</label>
                    <select onChange={this.handleSelect}>
                        <option value="all" selected>Wszystkie</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {roomThumbnails}
                </div>
            </div>
        )
    }
}