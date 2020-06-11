import React, {Component} from "react";
import RoomService from "../../service/RoomService";
import ReservationService from "../../service/ReservationService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Col, FormGroup, Label, Button } from "reactstrap";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";


const required = value => {
    if (!value) {
      return (
        <div className="my-alert">
          This field is required!
        </div>
      );
    }
  };

export default class CheckReservation extends Component {
    constructor(props) {
        super(props);

        this.handleConfirmReservation = this.handleConfirmReservation.bind(this);
        this.handleRoomSelection = this.handleRoomSelection.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGuestNumber = this.onChangeGuestNumber.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            checkInDate: new Date(),
            checkOutDate: new Date(),
            allRooms: [],
            allReservations: [],
            numberOfGuests: "",
            loading: false,
            message: "",
            success : false,
            toastId : null,
            roomId: 0
        
        }
        
    }

    componentDidMount() {
        this.setState({
            checkInDate: new Date(this.props.AddReservation.checkInDate),
            checkOutDate: new Date(this.props.AddReservation.checkOutDate)
        })

        RoomService.getAllRooms3().then(
            response => {
                this.setState({
                    allRooms: response.data
                });
            }).catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
        });

        ReservationService.getAllReservations().then(
            response => {
                this.setState({
                    allReservations: response.data
                });
            }).catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
        });
    }


    onChangeFirstName(e) {
        e.preventDefault();
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        e.preventDefault();
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeGuestNumber(e){
        e.preventDefault();

        this.setState({
            numberOfGuests: parseInt(e.target.value)
        })
    }

    handleRoomSelection(e) {
        e.preventDefault();

        this.setState({
            roomId: e.target.value
        });
    }

    handleConfirmReservation(e) {
        e.preventDefault();

        this.setState({
            message: "",
            success: false
        });

        console.log('validate ret', this.form.validateAll());

        const newReservation = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            startDate: this.state.checkInDate,
            endDate: this.state.checkOutDate,
            room: {id: this.state.roomId}
        };


        if (this.checkBtn.context._errors.length === 0) {
            ReservationService.createNewReservation(newReservation).then(
                response => {
                    this.setState({
                        success: true
                    });

                    if (!toast.isActive(this.state.toastId)) {
                        this.setState({
                            toastId: toast.success('Reservation added successfully', {
                                position: toast.POSITION.BOTTOM_CENTER,
                                autoClose: false
                            })
                        })
                    }
                }).catch(error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    success: false,
                    message: resMessage
                });

                if (!toast.isActive(this.state.toastId)) {
                    this.setState({
                        toastId: toast.error('ERROR!', {
                            position: toast.POSITION.BOTTOM_CENTER,
                            autoClose: false
                        })
                    })
                }
            });
        }
    }
    

    render() {

        // musze przefiltrowac po: ilości gości (czyli max_capacity w room --> room_standard) i po dostepnosci w zadanych datach
        // wyswietlic tylko te ktore są wtedy dostępne 

        const {allReservations,  checkInDate, checkOutDate, filterByDate, allRooms, numberOfGuests} = this.state;

        let filteredRooms = allRooms.filter(room => {
            return room.roomStandard.max_capacity === numberOfGuests;
        }).filter(room => {
            let reservations = allReservations.filter(reservation => {
                return room.id == reservation.room.id;
            })
              if(reservations.length == 0)        
                    return true;
                else {
                    for(var i = 0; i < reservations.length; i++) {
                        let startDate = new Date(reservations[i].startDate);
                        let endDate = new Date(reservations[i].endDate);
                        if( (checkInDate >= startDate && checkInDate < endDate)   ||
                            (checkOutDate > startDate && checkOutDate < endDate)  ||
                            (checkInDate <= startDate && checkOutDate >= endDate) )
                            return false;
                    }
                    return true;    
                }
        });
        
    

        return (
            <div className="my-reservation-container">
            <Form className="reservation-form"
                  onSubmit={this.handleConfirmReservation}
                  ref={c => {
                      this.form = c;
                  }}>
            

                <div className="my-form-group">
                    <label htmlFor="firstname" className="my-label">IMIĘ</label>
                    <Input
                        type="text"
                        className="input-control"
                        name="firstname"
                        value={this.state.firstName}
                        onChange={this.onChangeFirstName}
                        validations={[required]}
                    />
                </div>

                <div className="my-reservation-group">
                    <label htmlFor="lastname" className="my-label">NAZWISKO</label>
                    <Input
                        type="text"
                        className="input-control"
                        name="lastname"
                        value={this.state.lastName}
                        onChange={this.onChangeLastName}
                        validations={[required]}
                    />
                </div>

                <div className="my-reservation-group">
                    <label htmlFor="guestNumber" className="my-label">ILOŚĆ GOŚCI</label>
                    <Input
                        type="text"
                        className="input-control"
                        name="guestNumber"
                        onChange={this.onChangeGuestNumber}
                        validations={[required]}
                    />
                </div>


                <div className="room-selection">
                    <label htmlFor="roomnumber" className="my-label" >NUMER POKOJU</label>
                    <select className="form-control-sm"
                            value={this.state.roomId}
                            onChange={this.handleRoomSelection}
                            name="roomnumber"
                            validations={[required]}>
                        {
                            filteredRooms.map(room => {
                                return <option key={room.id} value={room.id}> {room.roomName}</option>
                            })
                        }
                    </select>
                </div>


                <div className="my-reservation-group">
                    <button
                        className="my-button login-button"
                        disabled={this.state.loading}
                        >
                        <span>DODAJ REZERWACJE</span>
                    </button>
                </div>


                <CheckButton
                    style={{display: "none"}}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        </div>

        );
    }


}