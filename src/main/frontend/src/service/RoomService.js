import axios from 'axios';

class RoomService {
    getAllRooms() {
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data._embedded.rooms;
        })
    }

    getRoomStandard(room) {
        return axios.get(room._links.self.roomStandard).then(response => {
            //console.log(response.data);
            return response.data;
        })
    }
}

export default new RoomService();