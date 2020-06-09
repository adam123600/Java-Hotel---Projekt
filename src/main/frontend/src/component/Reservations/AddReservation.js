import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import RoomService from "../../service/RoomService";
import DatePicker from "react-date-picker";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login/LoginPage.css';
import './Reservation.css';
import CheckReservation from './CheckReservation';
import Modal from "reactstrap/es/Modal";
import { Button } from 'reactstrap';



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
        // this.onClickButtonCheckFreeRooms = this.onClickButtonCheckFreeRooms.bind(this);

        this.state = {
            // message: "",
            // success : false,
            // toastId : null,
            checkInDate:  new Date(),
            checkOutDate: new Date(),
            // loading: true,
            // filterByDateModal: false,
            // filterByDate: false,
            // allRooms: [],
            // reservedRooms: [],
            // allReservations: [],
            modal: false,
            // roomId: 0
        }

        this.state.checkInDate.setHours(2,0,0,0);
        this.state.checkOutDate.setHours(2,0,0,0);
    }

    // componentDidMount() {
    //     RoomService.getAllRooms3().then(
    //         response => {
    //             this.setState({
    //                 allRooms: response.data
    //             });
    //         }).catch(error => {
    //         const resMessage =
    //             (error.response && error.response.data && error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //     });

    //     ReservationService.getAllReservations().then(
    //         response => {
    //             this.setState({
    //                 allReservations: response.data
    //             });
    //         }).catch(error => {
    //         const resMessage =
    //             (error.response && error.response.data && error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //     });
    // }

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

    // onClickButtonCheckFreeRooms(e){
    //     e.preventDefault();
    //     this.setState({
    //         filterByDate: true,
    //         loading: false
    //     });
    // }

    // handleRoomSelection(e) {
    //     e.preventDefault();

    //     this.setState({
    //         roomId: e.target.value
    //     });
    // }

    // handleConfirmReservation(e) {
    //     e.preventDefault();

    //     this.setState({
    //         message: "",
    //         success: false
    //     });

    //     this.form.validateAll();

    //     const newReservation = {
    //         firstName: this.state.firstName,
    //         lastName: this.state.lastName,
    //         startDate: this.state.checkInDate,
    //         endDate: this.state.checkOutDate,
    //         room: {id: this.state.roomId}
    //     };


    //     if (this.checkBtn.context._errors.length === 0) {
    //         ReservationService.createNewReservation(newReservation).then(
    //             response => {
    //                 this.setState({
    //                     success: true
    //                 });

    //                 if (!toast.isActive(this.state.toastId)) {
    //                     this.setState({
    //                         toastId: toast.success('Reservation added successfully', {
    //                             position: toast.POSITION.BOTTOM_CENTER,
    //                             autoClose: false
    //                         })
    //                     })
    //                 }
    //             }).catch(error => {
    //             const resMessage = (error.response && error.response.data && error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();

    //             this.setState({
    //                 success: false,
    //                 message: resMessage
    //             });

    //             if (!toast.isActive(this.state.toastId)) {
    //                 this.setState({
    //                     toastId: toast.error('ERROR!', {
    //                         position: toast.POSITION.BOTTOM_CENTER,
    //                         autoClose: false
    //                     })
    //                 })
    //             }
    //         });
    //     }
    // }

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