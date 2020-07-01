import React, { Component } from "react";
import DatePicker from "react-date-picker";
import {Button, ModalBody} from "reactstrap";
import SearchReservationService from "../../SearchEngine/SearchReservationService";
import ReservationService from "../../service/ReservationService";
import GuestService from "../../service/GuestService";
import {Link} from 'react-router-dom';

export default class ExtendStay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkOutDate: new Date(this.props.guest.checkOutDate),
            roomReservations: [],
            acceptExtendStay: null,
            rejectExtendStay: false,
        }
        this.handleExtendStay = this.handleExtendStay.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount() {
        ReservationService.getAllReservations1().then(res => {
            res = res.filter(reservation => {
                return reservation.room.id === this.props.room.id;
            }).sort((a,b) => {
                if( a.startDate > b.startDate ) return 1;
                if( a.startDate < b.startDate ) return -1;
                return 0;
            });
            this.setState({roomReservations: res});
        });
    }

    handleChangeDate(val) {
        let reservations = this.state.roomReservations;
        let wynik = false;
        if(reservations.length == 0)        // jeśli dla danego pokoju nie ma żadnych rezerwacji to git, można przepuścić ten pokój przez filtr
            wynik = true;
        else {
            if(val > new Date(reservations[0].startDate))
                wynik = false;
            else
                wynik = true;
        }
        this.setState({acceptExtendStay: wynik});
        console.log(wynik);
    }

    handleExtendStay() {
        if(this.state.acceptExtendStay) {
            this.setState({rejectExtendStay: false});
            GuestService.updateGuestById(this.props.guest.id, {checkOutDate: this.state.checkOutDate});
            window.location.reload(true);
        }
        else
            this.setState({rejectExtendStay: true});
    }

    render() {
        let acceptExtendStay;
        if(this.state.acceptExtendStay === null)
            acceptExtendStay = null;
        else if(this.state.acceptExtendStay === true)
            acceptExtendStay =
                <div style={{backgroundColor: 'lawngreen', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', border: 'none', margin: '20px'}}>
                    Wolne
                </div>;
        else
            acceptExtendStay =
                <div style={{backgroundColor: '#ff4d4d', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px', border: 'none', margin: '20px'}}>
                    Zajęte
                </div>;

        console.log("przefiltrowane");
        console.log(this.state.roomReservations);
        return(
            <div>
                <label style={{padding: '5px 12px 5px 30px'}}>planowany dzień wymeldowania:</label>
                <DatePicker
                    dateFormat='y-MM-dd'
                    value={this.state.checkOutDate}
                    selected={this.state.checkOutDate}
                    onChange={val => {val.setHours(2,0,0,0); this.setState({checkOutDate: val}); this.handleChangeDate(val)}}
                    minDate={new Date()}
                />
                <Button onClick={this.handleExtendStay} style={{backgroundColor: '#f99cab', border: 'none', margin: '20px'}}>
                    Przedłuż
                </Button>
                {acceptExtendStay}
                {this.state.rejectExtendStay &&
                <div>
                    Pokój będzie zajęty w zadanym terminie. <br/>
                    Czy chcesz utworzyć nową rezerwację? <br/>
                    <Link to={"/addreservation"}>
                        <Button style={{backgroundColor: '#f99cab', border: 'none', margin: '20px'}}>
                            Nowa rezerwacja
                        </Button>
                    </Link>
                </div>}
            </div>
        )
    }
}