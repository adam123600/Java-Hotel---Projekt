import axios from 'axios';

class SearchGuestService {
    findLastGuestByRoom(room) {
        return axios.get("/api/guests/search/findFirstByRoom_idOrderByCheckOutDateDesc?id=" + room.id ).then(response => {
            return response.data;
        })
    }

    searchByLastName(lastName) {
        return axios.get("/api/guests/search/findByLastName?lastName=" + lastName).then(response => {
            return response.data._embedded.guests;
        })
    }
}

export default new SearchGuestService();