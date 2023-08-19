import React from 'react'
import { NavLink } from "react-router-dom"
import { GlobalStyles } from '../../styles/globalStyles'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuthContext } from '../../context/authContext'
import { BsCart2 } from "react-icons/bs"
import icons from "../../assets/icons.png";
import { useCartContext } from '../../context/cartContext'

// import { AuthContext } from '../context/authContext'
// import Cookies from 'js-cookie'

const Navbar = () => {

  const authcontext = useAuthContext();
  const cartContext = useCartContext();


  const logOut = () => {
    authcontext.signOut();
  };

  console.log("user", authcontext.user.role)

  // const userContext = useContext(AuthContext);
  // const data = Cookies?.get("userInfo");
  // const navigate = useNavigate();

  // const userInfo = JSON.parse(data);
  // console.log("this",userContext.user);
  // console.log("sec", data)

  return (
    // <div style={GlobalStyles.navbar}>
    //     <NavLink to="/">Home</NavLink> 
    //     <NavLink to="/books">Books</NavLink> 
    //     <NavLink to="/loginform">Login</NavLink> 
    //     <NavLink to="/regform">Registration</NavLink> 
    //     <NavLink to="/2fi">aveyi</NavLink> 
    // </div>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#FF5733" }} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to={'/home'} ><img src={icons} alt="logo" style={{ width: 45 }} /></NavLink><b>...BookStore</b>
          </Typography>
          <div>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

              {!!authcontext.user.id && (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <div style={{display:"flex", columnGap:30}}>
                    <div>
                      <Button sx={{ color: '#fff' }}>
                        <NavLink style={GlobalStyles.navbarLink} to="/home">Home</NavLink>
                      </Button>
                    </div>
                    <span>

                      {authcontext.user.role == "admin" && (
                        <div>

                          <Button sx={{ color: '#fff' }}>
                            <NavLink style={GlobalStyles.navbarLink} to="/admin">Admin</NavLink>
                          </Button>
                          <Button sx={{ color: '#fff' }}>
                            <NavLink style={GlobalStyles.navbarLink} to="/user">User</NavLink>
                          </Button>
                          <Button sx={{ color: '#fff' }}>
                            <NavLink style={GlobalStyles.navbarLink} to="/category">Category</NavLink>
                          </Button>
                        </div>
                      )}
                    </span>
                    <div>
                      <Button sx={{ color: '#fff' }}>
                        <NavLink style={GlobalStyles.navbarLink} to="/cart" >
                          <BsCart2 size={30} style={{ marginRight: "5px" }} />
                          Cart
                          <span style={GlobalStyles.cartspan} >{cartContext.cartData.length}</span>
                        </NavLink>
                      </Button>
                    </div>
                    <div>
                      <Button sx={{ color: '#fff' }}>
                        <NavLink style={GlobalStyles.navbarLink} to="/updateprofile" >Profile</NavLink>
                      </Button>
                    </div>
                    <div>
                      <Button sx={{ color: '#fff', backgroundColor: "#FF5733" }} onClick={() => logOut()}>
                        Log out
                      </Button>
                    </div>
                  </div>
                </Box>
              )}
              {!authcontext.user.id && (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Button sx={{ color: '#fff' }}>
                    <NavLink style={GlobalStyles.navbarLink} to="/">Login</NavLink>
                  </Button>
                  <Button sx={{ color: '#FFF' }}>
                    <NavLink style={GlobalStyles.navbarLink} to="/regform">Registration</NavLink>
                  </Button>
                </Box>
              )}
            </Box>
          </div>
          {/* <Button color="inherit">Login</Button> #fd78b8 #ff445d*/}
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default Navbar