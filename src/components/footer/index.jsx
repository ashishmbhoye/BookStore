import React from 'react';
import logo from './icons8-books-emoji-96.png'
import { Link, NavLink } from 'react-router-dom';
import "./style.css";
import { Typography } from '@mui/material';
import icons from "../../assets/icons.png";
const Footer = () => {
    // const classes = footerStyle();

    return (
        <div >
            <div >
                <div className="-foobottomter">
                    <div >
                        <div className="text-center-footer">
                            <div className="footer-logo">
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"white" }}>
                                    <NavLink to={'/home'} ><img src={icons} alt="logo" style={{ width: 45 }} /></NavLink><b>...BookStore</b>
                                </Typography>
                            </div>
                            <p className='copyright-text'>
                                © 2023 BookStore.com all rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;