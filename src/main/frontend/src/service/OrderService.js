import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/orders1/';
const API_LINK = '/api/orders/';

class OrderService {
    getAllOrders() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    getOrderById(id) {
        return axios.get(API_URL + id, {headers: authHeader()});
    }

    deleteOrderById(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }

    createNewOrder(newOrder) {
        return axios.post(API_URL, newOrder, {headers: authHeader()});
    }

    createNewOrderLink(newOrder) {
        return axios.post(API_LINK, newOrder, {headers: authHeader()});
    }

    updateOrderById(id, newOrder) {
        return axios.put(API_URL + id, newOrder, {headers: authHeader()});
    }
}

export default new OrderService()