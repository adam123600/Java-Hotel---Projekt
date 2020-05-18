import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/users1/';

class UserService {
  getUserById(id) {
    return axios.get(API_URL + id, {headers: authHeader()});
  }

}

export default new UserService();