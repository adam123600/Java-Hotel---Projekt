import axios from 'axios';
import authHeader from "./AuthHeader";
import SearchRoom from "../SearchEngine/SearchRoomService";

const API_URL = "/api/rooms";
const img = "/RoomOccupancy/";

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

    getAllRooms1() {
        return axios.get("/api/rooms1").then(response => {
            return response.data;
        });
    }

    getAllRooms2(){
        //return axios.get(API_URL, {headers: authHeader()});
        return axios.get("/api/rooms").then(response => {
            //console.log(response.data);
            return response.data;
        })
    }

    getRoomStandard(room) {
        return axios.get("/api/rooms/" + room.id + "/roomStandard", {headers: authHeader()}).then(response => {
            return response.data;
        })
    }

    getRoomOccupancyImg(room) {
        return this.getRoomStandard(room).then(res => {
            return (img + room.currentNumberOfGuests + res.max_capacity + '.png');
        });
    }

    getRoomGuests(room) {
        return axios.get("/api/rooms/" + room.id + "/guests").then(response => {
            return response.data._embedded.guests;
        })
    }

    getRoomServices(room){
        return axios.get("/api/rooms/" + room.id + "/services").then(response => {
            return response.data._embedded.services;
        })
    }

    getAllStandards() {
        return axios.get("/api/roomStandards").then(response => {
            return response.data._embedded.roomStandards;
        })
    }

    getRoomById(id){
        return axios.get("/api/rooms/" + id,{headers: authHeader()}).then(response => {
                return response.data;
            })
            .catch(err => console.log(err));
    }

    updateRoomById(id, newRoom) {
        return axios.put("/api/rooms/" + id, newRoom, {headers: authHeader()})
            .catch(err => console.log(err));
    }

    patchRoomById(id, newValues) {      // można podać niepełny obiekt zawierający pola pokoju
        return axios.patch("/api/rooms/" + id, newValues, {headers: authHeader()})
            .catch(err => console.log(err));
    }

}

export default new RoomService();