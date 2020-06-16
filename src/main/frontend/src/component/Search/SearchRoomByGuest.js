import React, { Component } from "react";
import SearchGuestService from "../../SearchEngine/SearchGuestService";
import { Redirect } from 'react-router-dom'
import SearchRoomService from "../../SearchEngine/SearchRoomService";
import GuestService from "../../service/GuestService";

export default class SearchRoomByGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputFirstName: "",
            inputLastName: "",
            allGuests: [],
            renderRoom: false,
        }
        GuestService.getAllGuests1().then(res => {
            this.setState({allGuests: res});
        });
    }

    handleSubmit = event =>  {
        event.preventDefault();
        var guests = this.state.allGuests.filter(guest => {
            return guest.firstName.toLowerCase().match(this.state.inputFirstName.toLowerCase()) && guest.lastName.toLowerCase().match(this.state.inputLastName.toLowerCase());
        });
        if(guests[0])
            this.setState({
                allGuests: guests,
                renderRoom: true,
            });
    }

    render() {
        return(
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label style={{padding: '5px 12px 5px'}}>Imię i nazwisko gościa:</label>
                        <input type="text" name="input" value={this.state.inputFirstName} onChange={event => {event.preventDefault(); this.setState({inputFirstName: event.target.value})}}/>
                        <input type="text" name="input" value={this.state.inputLastName} onChange={event => {event.preventDefault(); this.setState({inputLastName: event.target.value})}}/>
                        <input style={{backgroundColor: '#f99cab', color: 'white'}} type="submit" value={'Szukaj'}/>
                    </form>
                </div>
                {this.state.renderRoom && <Redirect to={'/rooms/'+this.state.allGuests[0].room.roomName} />}
            </div>
        )
    }

}