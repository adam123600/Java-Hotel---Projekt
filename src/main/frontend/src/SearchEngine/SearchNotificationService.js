import axios from 'axios';

class SearchNotificationService {
    findByRoomName(roomName) {
        return axios.get("/api/notifications/search/findByRoom_roomName?roomName=" + roomName ).then(response => {
            return response.data._embedded.notifications;
        })
    }
}

export default new SearchNotificationService();