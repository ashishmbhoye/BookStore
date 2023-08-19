import axios from "axios";

const BASEURL = " https://book-e-sell-node-api.vercel.app/api"

class UserService {

    GetAllUsers = async(payload) => {
        return axios.get(`${BASEURL}/user/all`, payload)
     };

     getById = async(userid) => {
        return axios.get(`${BASEURL}/user/byId?id=${userid}`)    
      };

    GetAllRoles = async(payload) => {
        return axios.get(`${BASEURL}/user/roles`, payload)
     };

     GetPaginatedUsers = async(pgS,pgI) => {
        return axios.get(`${BASEURL}/user?pageSize=${pgS}&pageIndex=${pgI}`) 
     };

     updateUser = async(payload) => {
           return axios.put(`${BASEURL}/user`, payload);       
      };

     updateProfile = async(payload) => {
           return axios.put(`${BASEURL}/user`, payload);       
      };


}


export default new UserService();