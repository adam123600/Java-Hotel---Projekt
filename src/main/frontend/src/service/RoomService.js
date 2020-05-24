import axios from 'axios';
import authHeader from "./AuthHeader";

const API_URL = "/api/rooms";

class RoomService {
    getAllRooms() {
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data._embedded.rooms;
        })
    }

    getAllRooms3(){
        return axios.get("/api/rooms1", {headers: authHeader()});
    }

    getAllRooms2(){
        //return axios.get(API_URL, {headers: authHeader()});
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data;
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