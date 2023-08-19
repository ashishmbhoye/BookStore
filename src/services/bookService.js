import axios from "axios";

const BASEURL = " https://book-e-sell-node-api.vercel.app/api"

class BookService {

    GetAllBooks = async(payload) => {
       return axios.get(`${BASEURL}/book/all`, payload)
    };
    SearchBooks = async(keyword) => {
       return axios.get(`${BASEURL}//book/search?keyword=${keyword}`)
    };

    GetPaginatedBooks = async(pgS,pgI) => {
       return axios.get(`${BASEURL}/book?pageSize=${pgS}&pageIndex=${pgI}`) 
    };
    
    getById = async(bookid) => {
      return axios.get(`${BASEURL}/book/byId?id=${bookid}`)    
    };
    // api/book/byId?id=12
    


   addeditbook = async(payload) => {
      if(payload.id){
            return axios.put(`${BASEURL}/book`, payload);
         } else {
            return axios.post(`${BASEURL}/book`, payload);
         }
      };
   
   GetAllCategories = async(payload) => {
      return axios.get(`${BASEURL}/category/all`, payload)
   };

   GetPaginatedCategories = async(pgS,pgI) => {
      return axios.get(`${BASEURL}/category?pageSize=${pgS}&pageIndex=${pgI}`) 
   };
   
   getOneCategoryById = async(bookid) => {
     return axios.get(`${BASEURL}/category/byId?id=${bookid}`)    
   };

   addeditcategory = async(payload) => {
      if(payload.id){
            return axios.put(`${BASEURL}/category`, payload);
         } else {
            return axios.post(`${BASEURL}/category`, payload);
         }
      };

}

export default new BookService();