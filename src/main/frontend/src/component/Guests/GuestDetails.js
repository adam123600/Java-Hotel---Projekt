import * as React from "react";
import GuestService from "../../service/GuestService";

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
                <div>
                    <h2>Imię: {this.state.guestInfo.firstName}</h2>
                    <h2>Nazwisko: {this.state.guestInfo.lastName}</h2>
                    <h3>Data zameldowania: {this.state.guestInfo.accommodationDate}</h3>
                    <h3>Data wymeldowania: {this.state.guestInfo.checkOutDate}</h3>
                    <button style={{marginRight: "7px"}}>Rachunek</button>
                    <button style={{marginLeft: "7px"}}>Wymelduj</button>
                </div>
            );
            //TODO: obsługa tych dwóch przycisków
        }
}