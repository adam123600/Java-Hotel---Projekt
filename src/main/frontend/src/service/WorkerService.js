import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/usersNoLinks/';

class WorkerService {
    deleteWorker(worker) {
        axios.delete(worker._links.self.href).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err)
        });
    }

    getAllWorkers() {
        return axios.get("/api/users").then(response => {
            console.log(response.data);
            return response.data._embedded.users;
        }).catch(err=>{console.log(err)});
    }

    getWorkerRole(worker) {
        return axios.get(worker._links.roles.href).then(response => {
            console.log(response.data);
            return response.data._embedded.roles[0].name;
        })
    }

    getWorkersNoLinks() {
        return axios.get(API_URL).then(response => {
            return response.data;
        }).catch(err=>{console.log(err)});
    }

    getAllRoles() {
        return axios.get("/api/roles/").then(response => {
            console.log(response.data);
            return response.data._embedded.roles;
        })
    }



    roleNameToPolish(roleName) {
        switch(roleName) {
            case 'ROLE_RECEPTIONIST':       return 'Recepcjonista';
            case 'ROLE_ACCOUNTANT':         return 'Księgowy';
            case 'ROLE_CLEANER':            return 'Sprzątacz';
            case 'ROLE_BUTLER':             return 'Lokaj';
            case 'ROLE_MANAGER':            return 'Menadżer';
            case 'ROLE_KITCHEN_MANAGER':    return 'Menadżer kuchni';
            case 'ROLE_REPAIRMAN':          return 'Konserwator';
            default:                        return roleName;
        }
    }

    resetPassword(href, userResetPassword) {
        return axios.put(href + "/changePassword", userResetPassword, {headers: authHeader()});
    }
}

export default new WorkerService();