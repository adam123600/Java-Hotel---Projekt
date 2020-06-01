import * as React from "react";
import GuestService from "../../service/GuestService";
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
import RoomService from "../../service/RoomService";

export default class GuestDetails extends React.Component{

        constructor(props) {
            super(props);

            this.state = {
                guestInfo: [],
                redirect: false,
                roomOfGuest: [],
            }
        }

        componentDidMount() {
            if(!this.props.location.props){
                let id = window.location.href.match(/[0-9]*$/).toString();//pobieramy id z linku
                GuestService.getGuestById(id).then(result =>{
                    this.setState({
                        guestInfo: result,
                    })
                });
                GuestService.getGuestRoomById(id).then( room => {
                    this.setState({
                        roomOfGuest: room,
                    })});
                }

            else{
                this.setState({
                    guestInfo: this.props.location.props.guest,
                });
                GuestService.getGuestRoomById(this.props.location.props.guest.id).then( room => {
                    this.setState({
                        roomOfGuest: room,
                    })});
            }
        }
        
        onCheckoutGuest = () =>{
            console.log(this.state.roomOfGuest);
            const guestRoom = {
                roomName: this.state.roomOfGuest.roomName,
                currentNumberOfGuests: this.state.roomOfGuest.currentNumberOfGuests-1,
                balance: this.state.roomOfGuest.balance,
                roomStandard: this.state.roomOfGuest.roomStandard,
                notifications: this.state.roomOfGuest.notifications,
                reservations: this.state.roomOfGuest.reservations,
                guests: this.state.roomOfGuest.guests,
            }
            RoomService.updateRoomById(this.state.roomOfGuest.id,guestRoom);
            GuestService.deleteGuestById(this.state.guestInfo.id);
            this.setState({
                redirect: true,
            });
        }

    render() {
            return(
                <ListGroup className="w-25" style={{ position: 'absolute', top: '25%', left: '40%', zIndex: '-1'}}>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Imię</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.firstName}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Nazwisko</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.lastName}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Data zameldowania</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.accommodationDate}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Data wymeldowania</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.checkOutDate}</ListGroupItem>
                    <Button style={{backgroundColor: '#f99cab', border: 'none'}}>Rachunek</Button>
                    <Button onClick={this.onCheckoutGuest} style={{backgroundColor: '#f99cab', border: 'none', marginTop: '2px'}}>Wymelduj</Button>
                    {this.state.redirect && 
                    <Redirect 
                        to={{
                            pathname: '../guests',
                            
                        }}/>}
                </ListGroup>
            );
            //TODO: obsługa tych dwóch przycisków
        }
}