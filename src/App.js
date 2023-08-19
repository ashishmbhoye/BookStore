import './App.css';
import Home from './components/Home';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material"
import NotFound from './components/NotFound';
import BooksList from './components/BooksList';
import Navbar from './components/header/Navbar';
import LoginForm from './pages/Login/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper, { AuthContext } from './context/authContext';
import { useContext } from 'react';
import AdminBookPage from './components/admin/AdminBookPage';
import EditBookPage from './components/admin/EditBookPage';
import UserPage from './components/user/UserPage';
import EditUserPage from './components/user/EditUserPage';
import CategoryPage from './components/category/CategoryPage';
import EditCategoryPage from './components/category/EditCategoryPage';
import UpdateProfile from './components/Profile/UpdateProfile';
import Cart from './components/cart/Cart';
import { CartWrapper } from './context/cartContext';
import Footer from './components/footer';

function App() {

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#FF5733",   // #ff4058
            color: "white"
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {

          }
        }
      }
    }
  })

  const userContext = useContext(AuthContext);
  // console.log("this",userContext.user);


  return (
    <>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          <AuthWrapper>
            <CartWrapper>

              <ToastContainer />

              <Navbar />

              <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/home' element={userContext?.user ? <BooksList /> : <Navigate to={"/"} />} />
                <Route path='/books' element={userContext?.user ? <BooksList /> : <Navigate to={"/"} />} />
                <Route path='/regform' element={<RegistrationForm />} />
                <Route path='/admin' element={<AdminBookPage />} />
                <Route path='/addbook' element={<EditBookPage />} />
                <Route path='/editbook/:id' element={<EditBookPage />} />
                <Route path='/user' element={<UserPage />} />
                <Route path='/edituser/:id' element={<EditUserPage />} />
                <Route path='/category' element={<CategoryPage />} />
                <Route path='/addcategory' element={<EditCategoryPage />} />
                <Route path='/editcategory/:id' element={<EditCategoryPage />} />
                <Route path='/updateprofile' element={<UpdateProfile />} />
                <Route path='/cart' element={<Cart />} />
                {/* <Route path='/admin' element={userContext?.user ? <AdminBookPage />: <Navigate to={"/"} />} /> */}


                <Route path='/*' element={<NotFound />} />
              </Routes>

            </CartWrapper>
          </AuthWrapper>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
