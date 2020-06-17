import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = "/api/reservations1/";
const API_URL2 = "/api/reservations/";

class ReservationService {

    getAllReservations() {
        return axios.get(API_URL, {headers: authHeader()});
        
    }
    createNewReservation(newReservation){
        return axios.post(API_URL, newReservation, {headers: authHeader()}).catch(err=>{console.log(err)});
    }
    deleteReservationById(id){
        return axios.delete(API_URL2 + id, {headers: authHeader()}).catch(err => { console.log(err)});
    }
}

export default new ReservationService();