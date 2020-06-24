import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "/api/notifications/";


class NotificationService{

    getAllNotifications() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    forgotUserPassword(username){
        return axios.post(API_URL + "forgotpassword",{
            username
        });
    }

    smallAmountItem(item) {
        return axios.post(API_URL + "smallAmountItem", item);
    }
    
    getNotificationById(id){
        return axios.get(API_URL + id, {headers: authHeader()});
    }

    getAllNotificationsByNotificationTypeId(notTypeId){
        return axios.get(API_URL + "type/" + notTypeId, {headers: authHeader()});
    }

    deleteNotificationById(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }
}

export default new NotificationService()