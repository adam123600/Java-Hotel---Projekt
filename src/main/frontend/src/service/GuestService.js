import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/guests/';
// API: localhost:8080/api/guests

class GuestService {

    getAllGuests() {
        return axios.get("/api/guests").then(response => {
            //console.log(response.data);
            return response.data._embedded.guests;
        });
    }

    getAllGuests1() {
        return axios.get("api/guests1").then(response => {
            return response.data;
        })
    }

    createNewGuest(newGuest){
        return axios.post(API_URL, newGuest, {headers: authHeader()}).catch(err=>{console.log(err)});
    }

    getGuestById(id){
        return axios.get(API_URL + id, {headers: authHeader()})
            .then(response => {
                return response.data;
            })
            .catch(err=>{console.log(err)});
    }

    getGuestRoomById(id){
        return axios.get(API_URL + id + "/room",{headers: authHeader()})
            .then(response => {
                return response.data;
            })
            .catch(err=>{console.log(err)});
    }

    deleteGuestById(id){
        return axios.delete(API_URL + id, {headers: authHeader()}).catch( err => { console.log(err) });
    }
}

export default new GuestService();