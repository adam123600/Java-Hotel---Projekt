import React, {Component} from "react";
import RoomService from "../../service/RoomService";
import GuestService from "../../service/GuestService";
import DatePicker from "react-date-picker";

export default class AddGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            accommodation_date: new Date(),
            check_out_date: new Date(),
            hrefRoom: "",
            all_rooms: [],
            newGuestRoom: [],
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.reservation.firstName,
            last_name: this.props.reservation.lastName,
            newGuestRoom: this.props.reservation.room,
            accommodation_date: new Date(this.props.reservation.startDate),
            check_out_date: new Date(this.props.reservation.endDate)
        })

        RoomService.getAllRooms().then(
            response => {
                this.setState({
                    all_rooms: response,
                    hrefRoom: response[0]._links.self.href,
                });
            },
            error => {
                this.setState({
                    all_rooms:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleSubmit = () => {
        const newGuest = {
            accommodationDate : this.state.accommodation_date,
            checkOutDate: this.state.check_out_date,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            room: this.state.hrefRoom
        };
        const guestRoom = {
            roomName: this.state.newGuestRoom.roomName,
            currentNumberOfGuests: this.state.newGuestRoom.currentNumberOfGuests+1,
            balance: this.state.newGuestRoom.balance,
            roomStandard: this.state.newGuestRoom.roomStandard,
            notifications: this.state.newGuestRoom.notifications,
            reservations: this.state.newGuestRoom.reservations,
            guests: this.state.newGuestRoom.guests,
        }
        RoomService.updateRoomById(this.state.newGuestRoom.id, guestRoom);
        GuestService.createNewGuest(newGuest);
    }

    handleSelect = event => {
        this.setState({
            hrefRoom: event.target.value
        });
        let newGuestRoomId = event.target.value.match(/[0-9]*$/).toString();
        RoomService.getRoomById(newGuestRoomId).then( result => {
            this.setState({
                newGuestRoom: result,
            })
        });
    }

    render() {
        return (
            <div onSubmit={this.handleSubmit()} style={{margin: '10px'}}>
                    <form style={{display: 'inline'}}>
                    <h3>Dodajesz gościa:</h3>
                    <label htmlFor={'guestfirst_name'}>Imię:</label>
                    <input type={'text'} value={this.state.first_name} onChange={event => this.setState({first_name: event.target.value})} name={'guestfirst_name'} required/><br/>
                    <label htmlFor={'guestlast_name'}>Nazwisko:</label>
                    <input type={'text'} value={this.state.last_name} onChange={event => this.setState({last_name: event.target.value})} name={'guestlast_name'} required/><br/>
                    <label htmlFor={'accommodation_date'}>Data zameldowania:</label>
                    <DatePicker value={this.state.accommodation_date} selected={this.state.accommodation_date} onChange={date => this.setState({accommodation_date: date})} dateFormat="yyyy-MM-dd" name={'accommodation_date'} required/><br/>
                    <label htmlFor={'check_out_date'}>Data wymeldowania:</label>
                    <DatePicker value={this.state.check_out_date} selected={this.state.check_out_date} onChange={date => this.setState({check_out_date: date})} dateFormat="yyyy-MM-dd" name={'check_out_date'} required/><br/>
                    <label htmlFor={'roomNumber'}>Numer pokoju:</label>
                    <select className="form-control-sm" onChange={event => this.handleSelect(event)} name={'roomNumber'} style={{textAlignLast: 'center'}}>
                    {
                        this.state.all_rooms.map(room => {
                            if (room.roomName === this.state.newGuestRoom.roomName)
                            {
                                return <option key={room._links.self.href}
                                               value={room._links.self.href} selected>{room.roomName}</option>
                            }else
                            {
                                return <option key={room._links.self.href}
                                               value={room._links.self.href}>{room.roomName}</option>
                            }
                        })
                    }
                    </select><br/>
                    <input type={'submit'} value={'Dodaj'} className="btn btn-success" style={{margin: '10px'}}/>

                    </form>
            </div>
        );
    }
}