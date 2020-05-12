import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "/api/auth/";
const API_URL_USERS = "/api/users/";
const API_URL_ROLES = "/api/roles";

class AuthService {
  login(username, password) {
    return axios
        .post(API_URL + "login", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAllUsers(){
    return axios.get(API_URL_USERS).then(response =>{
      //console.log(response.data);
      return response.data;
    }).catch(err=>{console.log(err)});
  }

  deleteUser(id){
    axios.delete(API_URL_USERS + id).then(function (response) {
      console.log(response);
    }).catch(err => {console.log(err)});
  }

  getRolesOfWorker(id) {
    return axios.get(API_URL_USERS + id + "/roles", {headers: authHeader()});
  }
  getAllRoles() {
    return axios.get(API_URL_ROLES, {headers: authHeader()});
  }

  deleteRole(worker, role) {
    axios.delete(API_URL_USERS + worker + "/roles" + "/" + role);
  }

  addRole(worker, role) {
    console.log("Worker: " + worker + " role: " + role);
    axios.post(API_URL_USERS + worker + "/roles", role, {headers: authHeader()}).then(function(response) {
      console.log(response);
    }).catch(err => {console.log(err)});
  }

  /*  getRolesOfWorker(id) {
      return axios.get(API_URL_USERS + id + "/roles").then(response => {
        console.log(response.data);
        return response.data;
      }).catch(err=>{console.log(err)});
    }*/
}

export default new AuthService();