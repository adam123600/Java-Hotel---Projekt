import axios from "axios";

const API_URL = "/api/userpassword/";

class ForgotPasswordService{

    forgotUserPassword(username){
        return axios.post(API_URL + "forgotpassword",{
            username
        });
    }
}

export default new ForgotPasswordService()