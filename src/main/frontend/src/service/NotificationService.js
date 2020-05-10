import axios from "axios";

const API_URL = "/api/notifications/";

class NotificationService{

    forgotUserPassword(username){
        return axios.post(API_URL + "forgotpassword",{
            username
        });
    }
}

export default new NotificationService()