import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/guests/';
// API: localhost:8080/api/guests

class GuestService {

    getAllGuests() {
        return axios.get("/api/guests").then(response => {
            console.log(response.data);
            return response.data._embedded.guests;
        });
    }
    createNewGuest(newGuest){
        return axios.post(API_URL, newGuest, {headers: authHeader()}).catch(err=>{console.log(err)});
    }
}

export default new GuestService();