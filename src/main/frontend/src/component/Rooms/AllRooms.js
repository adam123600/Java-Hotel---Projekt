import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import RoomThumbnail from "./RoomThumbnail"
import SearchRoom from "../Search/SearchRoom";
import SearchRoomByGuest from "../Search/SearchRoomByGuest";
import DatePicker from "react-date-picker";
import GuestService from "../../service/GuestService";
import ReservationService from "../../service/ReservationService";
import {Spinner} from 'reactstrap';


export default class AllRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            allStandards: [],
            allGuests: [],
            allReservations: [],
            onlyEmpty: false,
            floorRegex: ".*",
            standardRegex: ".*",
            filterOnDate: false,
            minDate: new Date(),
            checkInDate:  new Date(),
            checkOutDate: new Date(),
            loading: true
        }
        RoomService.getAllRooms1().then(res => {
            this.setState({allRooms: res});
        });

        RoomService.getAllStandards().then(res => {
            this.setState({allStandards: res});
        });

        GuestService.getAllGuests1().then(res => {
            this.setState({allGuests: res});
        });

        ReservationService.getAllReservations().then(res => {
            this.setState({
                allReservations: res.data,
                loading: false
            });
        });

        // żeby przy porównywaniu dat były takie same godziny (+2h bo strefa czasowa)
        this.state.checkInDate.setHours(2,0,0,0);
        this.state.checkOutDate.setHours(2,0,0,0);

        this.handleSelectFloor = this.handleSelectFloor.bind(this);
        this.handleSelectStandard = this.handleSelectStandard.bind(this);
    }

    handleSelectFloor(event) {
        this.setState({floorRegex: event.target.value});
    }

    handleSelectStandard(event) {
        this.setState({standardRegex: event.target.value});
    }

    render() {
        let datePickerStyle = this.state.filterOnDate ? {} : {opacity: '0.4'};

        let roomThumbnails = this.state.allRooms.filter(room => {               // filtrowanie po tym czy pokój TERAZ pusty czy nie
            if(this.state.onlyEmpty)
                return room.currentNumberOfGuests == 0;
            else
                return true;
        }).filter(room => {                                                     // filtrowanie po piętrze (pierwsza cyfra numeru pokoju)
            return room.roomName.match(this.state.floorRegex);
        }).filter(room => {                                                     // filtrowanie po standardzie
            return room.roomStandard.name.match(this.state.standardRegex);
        }).filter(room => {                                                     // filtrowanie po datach, w których pokój będzie pusty
           if(this.state.filterOnDate) {
               if(room.currentNumberOfGuests > 0) {                                 // jeśli w pokoju są teraz jacyś goście
                   let guests = this.state.allGuests.filter(guest => {                  // tworzy tablicę tych gości/a w tym pokoju
                       return room.id == guest.room.id;
                   });
                   if(guests.length > 1) {                                              // jeśli w pokoju jest więcej niż 1 gość, to sortuje malejąco po dacie wymeldowania
                       guests.sort((a,b) => {
                           if( a.checkOutDate > b.checkOutDate ) return -1;
                           if( a.checkOutDate < b.checkOutDate ) return 1;
                           return 0;
                       });
                   }
                   return new Date(guests[0].checkOutDate) <= this.state.checkInDate;
               }
               else
                   return true;
           }
           else
               return true;
        }).filter(room => {
            if(this.state.filterOnDate) {
                let reservations = this.state.allReservations.filter(reservation => {
                    return room.id == reservation.room.id;
                })
                if(reservations.length == 0)        // jeśli dla danego pokoju nie ma żadnych rezerwacji to git, można przepuścić ten pokój przez filtr
                    return true;
                else {
                    for(var i = 0; i < reservations.length; i++) {
                        let startDate = new Date(reservations[i].startDate);
                        let endDate = new Date(reservations[i].endDate);
                        // jeśli 'dostępny od' lub 'dostępny do' zawiera się w przedziale <start + 1dzień ; end - 1dzień> którejkolwiek rezerwacji dla tego pokoju
                        // lub jeśli przedział <start ; end > zawiera się w <dostępny od ; dostępny do>, to zwraca false
                        if( (this.state.checkInDate >= startDate && this.state.checkInDate < endDate)   ||
                            (this.state.checkOutDate > startDate && this.state.checkOutDate < endDate)  ||
                            (this.state.checkInDate <= startDate && this.state.checkOutDate >= endDate) )
                            return false;
                    }
                    return true;    // jeśli przez całą petlę ani razu nie zwróciło false, to pokój spełnia wymagania co do dostępności w zadanej dacie
                }
            }
            else
                return true;
        }).map(room => (
            <div key={room.id}>
                <RoomThumbnail room={room}/>
            </div>
        ));

        return(
            <div className="main-container">
                {this.state.loading && <Spinner animation="border"/>}
                <div className="content">
                    <SearchRoom/>
                    <SearchRoomByGuest/>
                    <input className="checkbox" type="checkbox" onClick={() => this.setState({onlyEmpty: !this.state.onlyEmpty})}></input>
                    <label style={{padding: '5px 12px 5px'}}>Tylko wolne pokoje</label>
                    <label style={{padding: '5px 12px 5px 30px'}}>Piętro:</label>
                    <select onChange={this.handleSelectFloor}>
                        <option value=".*" selected>Wszystkie</option>
                        <option value="^1">1</option>
                        <option value="^2">2</option>
                        <option value="^3">3</option>
                        <option value="^4">4</option>
                        <option value="^5">5</option>
                    </select>
                    <label style={{padding: '5px 12px 5px 30px'}}>Standard:</label>
                    <select onChange={this.handleSelectStandard}>
                        <option value=".*" selected>Dowolny</option>
                        {this.state.allStandards.map(standard => (
                            <option value={standard.name}>{standard.name}</option>
                        ))}
                    </select>
                    <br/>
                    <input className="checkbox" type="checkbox" onClick={() => this.setState({filterOnDate: !this.state.filterOnDate})}></input>
                    <label style={{padding: '5px 12px 5px'}}>Filtruj po dostępności</label>
                    <label style={datePickerStyle}>
                    <label style={{padding: '5px 12px 5px 30px'}}>Dostępny od:</label>
                        <DatePicker
                            dateFormat='y-MM-dd'
                            value={this.state.checkInDate}
                            selected={this.state.checkInDate}
                            onChange={val => {val.setHours(2,0,0,0); this.setState({checkInDate: val});}}
                            minDate={this.state.minDate}
                        />
                        <label style={{padding: '5px 12px 5px 30px'}}>Dostępny do:</label>
                        <DatePicker
                            dateFormat='y-MM-dd'
                            value={this.state.checkOutDate}
                            selected={this.state.checkOutDate}
                            onChange={val => {val.setHours(2,0,0,0); this.setState({checkOutDate: val});}}
                            minDate={this.state.checkInDate}        // bo data wymeldowania nie może być wczesniejsza niż data zameldowania
                        />
                    </label>
                    {roomThumbnails}
                </div>
            </div>
        )
    }
}