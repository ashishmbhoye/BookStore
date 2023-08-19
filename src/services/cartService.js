import axios from "axios";

const BASEURL = " https://book-e-sell-node-api.vercel.app/api"

class CartService {




     getCart = async(userid) => {
        return axios.get(`${BASEURL}/cart?userId=${userid}`)    
      };


     addToCart = async(data) => {
        return axios.post(`${BASEURL}/cart`,data)    
      };

     updateItem = async(data) => {
        return axios.put(`${BASEURL}/cart`,data)    
      };

     removeItem = async(itemId) => {
        return axios.delete(`${BASEURL}/cart?id=${itemId}`)    
      };


     placeOrder = async(order) => {
        return axios.post(`${BASEURL}/order`, order).then((res) => {
          return res;
        })
        .catch((e) => {
          return Promise.reject(e);
        });    
      };

    // http://localhost:5000/api/order


}


export default new CartService();