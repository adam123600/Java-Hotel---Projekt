import axios from 'axios';

class SearchReservationService {
    findByRoomId(roomId) {
        return axios.get("/api/reservations/search/findByRoom_id?id=" + roomId ).then(response => {
            console.log("w pliku")
            console.log(roomId);
            console.log(response.data._embedded.notifications);
            return response.data._embedded.notifications;
        })
    }
}

export default new SearchReservationService();