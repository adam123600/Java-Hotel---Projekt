import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import RoomThumbnail from "./RoomThumbnail"
import SearchRoom from "../Search/SearchRoom";
import SearchGuestService from "../../SearchEngine/SearchGuestService";
import DatePicker from "react-date-picker";
import GuestService from "../../service/GuestService";

export default class AllRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRooms: [],
            allStandards: [],
            allGuests: [],
            onlyEmpty: false,
            floorRegex: ".*",
            standardRegex: ".*",
            filterOnDate: false,
            minDate: new Date(),
            checkInDate:  new Date(),
            checkOutDate: new Date(),
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
                   //console.log(new Date(guests[0].checkOutDate).toISOString().substring(0, 10) == this.state.checkInDate.toISOString().substring(0, 10))
                   console.log("porównanie");
                   console.log(new Date(guests[0].checkOutDate));
                   console.log(this.state.checkInDate);
                   if( new Date(guests[0].checkOutDate) <= this.state.checkInDate ) return true;
                   else return false;
               }
               else
                   return true;
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
                <div className="content">
                    <SearchRoom/>
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
                    <br/>
                    To jeszcze nie działa!!!
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