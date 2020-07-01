import React, {Component} from "react";
import DatePicker from "react-date-picker";
import 'react-toastify/dist/ReactToastify.css';
import '../Login/LoginPage.css';
import './Reservation.css';
import CheckReservation from './CheckReservation';
import Modal from "reactstrap/es/Modal";




const required = value => {
    if (!value) {
      return (
        <div className="my-alert">
          This field is required!
        </div>
      );
    }
  };


export default class AddReservation extends Component {
    constructor(props) {
        super(props);

     
        this.onChangeCheckInDate = this.onChangeCheckInDate.bind(this);
        this.onChangeCheckOutDate = this.onChangeCheckOutDate.bind(this);


        this.state = {
            checkInDate:  new Date(),
            checkOutDate: new Date(),
            modal: false,
        }

        this.state.checkInDate.setHours(2,0,0,0);
        this.state.checkOutDate.setHours(2,0,0,0);
    }


    onButtonClick = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

 

    onChangeCheckInDate = date => {
        date.setHours(2, 0, 0, 0);
        this.setState({
            checkInDate: date
        });
    };

    onChangeCheckOutDate = date => {
        date.setHours(2, 0, 0, 0);
        this.setState({
            checkOutDate: date
        });
    };

    

    render(){
        
        return(
            <div className="my-reservation-container">
                <div className="reservation-form">
                
                    <div className="reservation-text">
                        <span>REZERWACJA</span>
                    </div>

                    <div className="my-date-group">
                        <label htmlFor="checkindate" className="my-label">ZAMELDOWANIE</label>
                        <DatePicker
                            dateFormat='y-MM-dd'
                            value={this.state.checkInDate}
                            selected={this.state.checkInDate}
                            onChange={this.onChangeCheckInDate}
                            minDate={new Date()}
                            name="checkindate"
                        />
                    </div>

                    <div className="my-date-group">
                        <label htmlFor="checkoutdate" className="my-label">WYMELDOWANIE</label>
                        <DatePicker
                            dateFormat='y-MM-dd'
                            value={this.state.checkOutDate}
                            selected={this.state.checkOutDate}
                            onChange={this.onChangeCheckOutDate}
                            minDate={this.state.checkInDate}
                            name="checkoutdate"
                        />
                    </div>

                    <button className="my-button login-button" onClick={this.onButtonClick}>SPRAWDŹ DOSTĘPNE POKOJE</button>
                     <Modal isOpen={this.state.modal} toggle={this.onButtonClick}>
                            <CheckReservation AddReservation={this.state}/>
                    </Modal>

            </div>
        </div>
        )
    }
}