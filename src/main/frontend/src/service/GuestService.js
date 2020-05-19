import axios from 'axios';

// API: localhost:8080/api/guests

class GuestService {

    getAllGuests() {
        return axios.get("/api/guests").then(response => {
            console.log(response.data);
            return response.data._embedded.guests;
        })
    }
}

export default new GuestService();