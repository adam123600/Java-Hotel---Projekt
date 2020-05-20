import axios from 'axios';
import authHeader from './AuthHeader';


const API_URL = 'api/guests/';

class GuestService{
    createNewGuest(newGuest){
        return axios.post(API_URL, newGuest, {headers: authHeader()}).catch(err=>{console.log(err)});
    }
}

export default new GuestService();