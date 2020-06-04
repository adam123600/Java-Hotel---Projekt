import axios from 'axios';

class SearchGuestService {
    findLastGuestByRoom(room) {
        return axios.get("/api/guests/search/findFirstByRoom_idOrderByCheckOutDateDesc?id=" + room.id ).then(response => {
            return response.data;
        })
    }
}

export default new SearchGuestService();