import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "/api/notifications/";
const API_URLtype = "/api/notificationTypes/";

class NotificationService{

    getAllNotifications() {
        return axios.get(API_URL, {headers: authHeader()});
    }


    getAllNotificationTypes(){
        return axios.get(API_URLtype, {headers: authHeader()})
        .then( response => {
            return response.data._embedded.notificationTypes;
        })
        .catch(err => 
            console.log(err)
        );
    }

    createNewNotification(notification){
        return axios.post(API_URL, notification, {headers: authHeader()})
        .catch( err => 
            console.log(err)
        )
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