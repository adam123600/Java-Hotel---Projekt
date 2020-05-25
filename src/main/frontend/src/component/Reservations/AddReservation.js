import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import RoomService from "../../service/RoomService";
import DatePicker from "react-date-picker";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPage.css';
import './Reservation.css';


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

        this.handleConfirmReservation = this.handleConfirmReservation.bind(this);
        this.handleRoomSelection = this.handleRoomSelection.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCheckInDate = this.onChangeCheckInDate.bind(this);
        this.onChangeCheckOutDate = this.onChangeCheckOutDate.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            message: "",
            success : false,
            toastId : null,
            checkInDate:  new Date(),
            checkOutDate: new Date(),
            allRooms: [],
            roomId: 0
        }

    }
    componentDidMount() {
      
       RoomService.getAllRooms3().then(
            response => {
                console.log("mamy pokoje!");
                this.setState({
                    allRooms: response.data
                });
            }).catch(error => {
                const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            // this.setState({
            //     loading: false,
            //     message: resMessage
            //   });
           
            //   if(! toast.isActive(this.state.toastId)){
            //     this.setState({
            //         toastId : toast.error(this.state.message, {
            //         position: toast.POSITION.BOTTOM_CENTER,
            //         autoClose: false
            //       })
            //     })
            //   }
            });
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
          });
    }

    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
          });
    }

    onChangeCheckInDate = date => {
        this.setState({
          checkInDate: date
        });
      };

      onChangeCheckOutDate = date => {
        this.setState({
          checkOutDate: date
        });
      };

    handleRoomSelection(e){
        e.preventDefault();

        this.setState({
            roomId: e.target.value
        });
        console.log(e.target.value);
    
    }

    handleConfirmReservation(e) {
        // toast.success('chuj');
        console.log("handleConfirmReservation")
        e.preventDefault();

        this.setState({
            message: "",
            success: false
          });

          this.form.validateAll();
      

        const newReservation = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            startDate : this.state.checkInDate,
            endDate: this.state.checkOutDate,           
            room: {id: this.state.roomId}
        };
        console.log(newReservation);


        if (this.checkBtn.context._errors.length === 0) {
            ReservationService.createNewReservation(newReservation).then(
              response => {
                this.setState({
                  success: true
                });

                console.log("toast")

  
                console.log('respone message: ', response.data.message);
                console.log('state.message: ', this.state.message);
                if(! toast.isActive(this.state.toastId)){
                  this.setState({
                        toastId : toast.success('reservation added successfully', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: false
                      })
                  })

                  console.log("toast success")
                } 
              }).catch(error => {
                  const resMessage = (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  this.setState({
                    success: false,
                    message: resMessage
                  });
    
                  if(! toast.isActive(this.state.toastId)){
                    this.setState({
                        toastId : toast.error('ERROR!', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: false
                      })
                    })
                  }  
              });

        }
    }

    render(){
        return(
            
          <div className="my-reservation-container">
            <Form className = "reservation-form"
            onSubmit={this.handleConfirmReservation}
            ref={c => {
              this.form = c;
            }}>
              <div className="reservation-text">
                <span>DODAJ REZERWACJE</span>
              </div>

              <div className="my-form-group">
                <label htmlFor="firstname" className="my-label">FIRST NAME</label>
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
                <label htmlFor="lastname" className="my-label">LAST NAME</label>
                <Input
                  type="text"
                  className="input-control"
                  name="lastname"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  validations={[required]}
                />
              </div>

              <div className="my-date-group">
                <label htmlFor="checkindate" className="my-label">CHECK IN DATE</label>
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
                <label htmlFor="checkoutdate" className="my-label">CHECK OUT DATE</label>
                <DatePicker 
                dateFormat='y-MM-dd'
                value={this.state.checkOutDate} 
                selected={this.state.checkOutDate} 
                onChange={this.onChangeCheckOutDate}
                minDate={new Date()}   
                name="checkoutdate"
                />
              </div>

              <div className="room-selection">
                  <label htmlFor="roomnumber" className="my-label">ROOM NUMBER</label>
                  <select className="form-control-sm"  
                  value = {this.state.roomId}
                  onChange={this.handleRoomSelection} 
                  name="roomnumber" 
                  validations={[required]}>

                    {
                        this.state.allRooms.map(room => {
                            return <option key={room.id} value={room.id}> {room.roomName}</option>
                        })
                    }
                    </select>
              </div>


                <div className="my-reservation-group">
                    <button
                    className="my-button login-button">
                        <span>ADD RESERVATION</span>
                    </button>
                </div>


              <CheckButton
                style={{ display: "none" }}
                  ref={c => {
                this.checkBtn = c;
                }}
              />
            </Form>
          </div>
     )
    }

}