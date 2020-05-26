import axios from 'axios';

class SearchRoomService {
    searchByRoomName(roomName) {
        return axios.get('/api/rooms/search/findByRoomName?roomName=' + roomName ).then(response => {
            return response.data;
        });
    }

    searchEmptyRooms() {
        return axios.get('/api/rooms/search/findByCurrentNumberOfGuests?num=0').then(response => {
            return response.data._embedded.rooms;
        })
    }
}

export default new SearchRoomService();