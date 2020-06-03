import React, {Component} from "react";
import RoomService from "../../service/RoomService";
import GuestService from "../../service/GuestService";
import DatePicker from "react-date-picker";
import { Form, Input, Col, FormGroup, Label, Button } from "reactstrap";

const URL_TO_ROOM = "localhost8080/api/rooms/";

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
                    hrefRoom: URL_TO_ROOM + this.props.reservation.room.id//response[0]._links.self.href,
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
            <div onSubmit={this.handleSubmit} style={{margin: '10px'}}>
                <h3>Dodajesz gościa:</h3>
                <Form>
                    <FormGroup row>
                        <Col>
                            <Input type="text" value={this.state.first_name} onChange={event => this.setState({first_name: event.target.value})} placeholder="Imię" required></Input>
                        </Col>
                        <Col>
                            <Input type="text" value={this.state.last_name} onChange={event => this.setState({last_name: event.target.value})} placeholder="Nazwisko" required></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <Label for={'accommodation_date'}>Data zameldowania:</Label>
                            <DatePicker value={this.state.accommodation_date} selected={this.state.accommodation_date} onChange={date => this.setState({accommodation_date: date})} dateFormat="yyyy-MM-dd" id={'accommodation_date'} required/><br/>
                        </Col>
                        <Col>
                            <Label for={'check_out_date'}>Data wymeldowania:</Label>
                            <DatePicker value={this.state.check_out_date} selected={this.state.check_out_date} onChange={date => this.setState({check_out_date: date})} dateFormat="yyyy-MM-dd" id={'check_out_date'} required/><br/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                    <Label htmlFor={'roomNumber'}>Numer pokoju:</Label>
                    <Input type="select" className="w-50" onChange={event => this.handleSelect(event)} name={'roomNumber'} style={{textAlignLast: 'center'}}
                            style={{position: 'relative', left: '25%'}}>
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
                    </Input><br/>
                    <Button type="submit" style={{backgroundColor: '#f99cab', width: '100px'}}>Dodaj</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}