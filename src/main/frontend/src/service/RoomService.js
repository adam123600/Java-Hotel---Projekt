import axios from 'axios';
import authHeader from "./AuthHeader";

class RoomService {
    getAllRooms() {
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data._embedded.rooms;
        })
    }

    getRoomStandard(room) {
        return axios.get(room._links.roomStandard.href, {headers: authHeader()}).then(response => {
            console.log("hej");
            console.log(response.data);
            return response.data;
        })
    }
}

export default new RoomService();