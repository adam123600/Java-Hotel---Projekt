import React, { Component } from "react";
import RoomService from "../../service/RoomService"
import SearchRoomService from "../../SearchEngine/SearchRoomService"
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {},
            img: "",
            guests: [],
            modal: false,

            services: [],
        }

        this.handleCheckout = this.handleCheckout.bind(this);
    }
    componentDidMount() {
        // jeśli strona została otwarta przez wpisanie linku na sztywno w pasek adresu
        // to pobiera z niego napis po ostatnim ukośniku - jest to numer pokoju
        var roomName;
        if(!this.props.location.state) {
            var href = window.location.href;
            var parts = href.split('/');
            roomName = parts[parts.length - 1];
            // zwraca obiekt {room} o zadanym nr pokoju i ustawia w stanie bieżącego komponentu
            SearchRoomService.searchByRoomName(roomName).then(res => {
                this.setState({room: res});
                RoomService.getRoomOccupancyImg(res).then(img => {
                    this.setState({img: img});
                })
                RoomService.getRoomGuests(res).then(guests => {
                    this.setState({guests:guests});
                })
                RoomService.getRoomServices(res).then(services => {
                    this.setState({services: services});
                });
            })
        }
        // jeśli strona została otwarta przez kliknięcie w minuaturę pokoju, to {room} został przekazany z miniaturki do tego komponentu
        else {
            var room = this.props.location.state.room;
            this.setState({
                room: room,
            });
            RoomService.getRoomOccupancyImg(room).then(img => {
                this.setState({img: img});
            });
            RoomService.getRoomGuests(room).then(guests => {
                this.setState({guests: guests});
            });
            RoomService.getRoomServices(room).then(services => {
                this.setState({services: services});
            });
        }
    }

    handleCheckout(guest) {
        this.setState({modal: !this.state.modal});
        console.log(guest.firstName);
    }

    render() {
        return(


            <div>
                <h1>{this.state.room.roomName}</h1>
                <img src={this.state.img}/>
                <h2>Aktualny rachunek: {this.state.room.balance} zł</h2>
                {this.state.guests.length > 0 &&
                <div> {/* trzeba css ogarnąć :D */}
                    <div>
                        <h4>Zamówione usługi do pokoju:</h4>
                        {this.state.services.map(service => (
                            <p>{service.description}</p>
                            )
                        )}
                    </div>
                    <h2>Goście:</h2>
                    <table style={{width: '80%'}}>
                        <tr>
                            <th>Gość</th>
                            <th>Data zakwaterowania</th>
                            <th>Planowana data wykwaterowania</th>
                        </tr>
                        {this.state.guests.map(guest => (
                            <tr key={guest.id}>
                                <td>{`${guest.firstName} ${guest.lastName}`}</td>
                                <td>{guest.accommodationDate}</td>
                                <td>{guest.checkOutDate}</td>
                                <td>
                                    <Button style={{backgroundColor: '#f99cab'}} onClick={() => { this.setState( {modal: !this.state.modal })}}>
                                        Wymelduj
                                    </Button>
                                    <Modal isOpen={this.state.modal} toggle={() => { this.setState( {modal: !this.state.modal })}}>
                                        <ModalHeader toggle={() => { this.setState( {modal: !this.state.modal })}}>Czy na pewno</ModalHeader>
                                        <ModalBody>
                                            Czy na pewno wymeldować gościa: <br/>
                                            {guest.firstName} {guest.lastName}? <br/>
                                            <Button style={{backgroundColor: '#f99cab', margin: '20px', width: '100px'}} onClick={() => this.handleCheckout(guest)}>Tak</Button>
                                            <Button style={{backgroundColor: '#f99cab', margin: '20px', width: '100px'}} onClick={() => { this.setState( {modal: !this.state.modal })}}>Nie</Button>
                                        </ModalBody>
                                    </Modal>
                                </td>
                            </tr> ))}
                    </table>
                    <Button style={{backgroundColor: '#f99cab', margin: '50px 30px', width: '150px'}}>Dodaj gościa</Button>
                    <Button style={{backgroundColor: '#f99cab', margin: '50px 30px', width: '150px'}}>Rachunek pokoju</Button>
                </div>}

            </div>
        )
    }
}