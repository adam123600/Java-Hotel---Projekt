import axios from 'axios';
import authHeader from './AuthHeader';

class WorkerService {
    getAllUsers(){
        return axios.get("/api/users").then(response =>{
            //console.log(response.data);
            return response.data._embedded.users;
        }).catch(err=>{console.log(err)});
    }
}

export default new WorkerService();