import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "/api/auth/";

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
      password,
    });
  }

  register(username, email, password, firstname, lastname, phonenumber, role){
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      role
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserByUsername(username){
    return axios.get("/api/users", {headers: authHeader()}).then(response => {
      console.log(response);
      return response.data;
    });
  }

  getAllUsers() {
    return axios.get("/api/users/", {headers: authHeader()}).then(response => {
      console.log(response);
      return response.data;
    });
  };
}

export default new AuthService();