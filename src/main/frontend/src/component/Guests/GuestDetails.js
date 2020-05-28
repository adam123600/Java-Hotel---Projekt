import * as React from "react";
import GuestService from "../../service/GuestService";
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
//import './GuestDetails.css';

export default class GuestDetails extends React.Component{

        constructor(props) {
            super(props);

            this.state = {
                guestInfo: [],
            }
        }

        componentDidMount() {
            if(!this.props.location.props){
                let link = window.location.href;
                GuestService.getGuestById(link.match(/[0-9]*$/).toString()).then(result =>{
                    this.setState({
                        guestInfo: result
                    })
                });
            }
            else{
                this.setState({
                    guestInfo: this.props.location.props.guest
                })
            }
        }

    render() {
            return(
                <ListGroup className="w-25" style={{position: 'absolute', top: '25%', left: '40%'}}>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Imię</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.firstName}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Nazwisko</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.lastName}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Data zameldowania</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.accommodationDate}</ListGroupItem>
                    <ListGroupItem className="py-0" style={{fontSize: '16px'}}>Data wymeldowania</ListGroupItem>
                    <ListGroupItem>{this.state.guestInfo.checkOutDate}</ListGroupItem>
                    <Button style={{backgroundColor: '#f99cab', border: 'none'}}>Rachunek</Button>
                    <Button style={{backgroundColor: '#f99cab', border: 'none', marginTop: '2px'}}>Wymelduj</Button>
                </ListGroup>
            );
            //TODO: obsługa tych dwóch przycisków
        }
}