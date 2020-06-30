import axios from "axios";
import authHeader from "./AuthHeader";


class ServicesService {
    getAllServices() {
        return axios.get("/api/services/").then(response => {
            return response.data._embedded.services;
        });
    }
    getAllServices1() {
        return axios.get("/api/services1/").then(response => {
            return response.data;
        })
    }

    getServiceType(service){
        return axios.get("/api/services/" + service.id + "/serviceType", {headers: authHeader() }).then(response => {
            return response.data;
        })
    }
    getAllServiceTypes() {
        return axios.get("/api/serviceTypes").then(response => {
            return response.data._embedded.serviceTypes;
        })
    }

    addService(service) {
        axios.post("/api/services/", service, {headers: authHeader()});
    }

    deleteService(service) {
        axios.delete("/api/services/" + service.id);
    }
}

export default new ServicesService();