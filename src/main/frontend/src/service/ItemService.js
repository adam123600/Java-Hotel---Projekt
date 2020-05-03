import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/items/';

class ItemService {
    getAllItems() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    getItemById(id) {
        return axios.get(API_URL + id, {headers: authHeader()});
    }

    deleteItemById(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }

    createNewItem(newItem) {
        return axios.post(API_URL, newItem, {headers: authHeader()});
    }

    updateItemById(id, newItem) {
        return axios.put(API_URL + id, newItem, {headers: authHeader()});
    }

}

export default new ItemService();