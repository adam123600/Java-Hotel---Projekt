import axios from "axios";
import authHeader from "./AuthHeader";


class ServicesService {
    getServiceType(service){
        return axios.get("/api/services/" + service.id + "/serviceType", {headers: authHeader() }).then(response => {
            return response.data;
        })
    }
}

export default new ServicesService();