import axios from 'axios';
import authHeader from './AuthHeader';

class WorkerService {
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

    getAllRoles() {
        return axios.get("/api/roles/").then(response => {
            console.log(response.data);
            return response.data._embedded.roles;
        })
    }

    deleteUser(id) {
        axios.delete("/api/users/" + id).then(function (response) {
            console.log(response);
        }).catch(err => {
            console.log(err)
        });
    }

    roleNameToPolish(roleName) {
        switch(roleName) {
            case 'ROLE_RECEPTIONIST': return 'Recepcjonista';
            case 'ROLE_ACCOUNTANT': return 'Księgowy';
            case 'ROLE_CLEANER': return 'Sprzątacz';
            case 'ROLE_BUTLER': return'Lokaj';
            case 'ROLE_MANAGER': return 'Menadżer';
            case 'ROLE_KITCHEN_MANAGER': return 'Menadżer kuchni';
            case 'ROLE_REPAIRMAN': return 'Konserwator';
            default: return roleName;
        }
    }
}

export default new WorkerService();