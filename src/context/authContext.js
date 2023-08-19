import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const initialuserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password:"",

};

const initialState = {
    setUser: () =>{},
    user: initialuserValue,
    signOut: ()=> {},
}

export const AuthContext = createContext(initialState);


const AuthWrapper = ({ children }) => {

    const [userData, setUserData] = useState(initialuserValue);
    const navigate = useNavigate();

    const setUser = (data) => {
        // console.log("yohoho",data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUserData(data.result);
    };

    const signOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
        window.location.reload();
    }

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("userInfo")) || initialuserValue;
        
        if(!data.email){
            navigate("/")
        }
        setUserData(data);
    },[]);
    
    // console.log("data: ", userData);
    let value = {
        setUser,
        user: userData,
        signOut,
    }

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export default AuthWrapper;

export const useAuthContext = () => {
    return useContext(AuthContext);
  };
  