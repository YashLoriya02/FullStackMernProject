import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../../store/auth'
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const { isLoggedIn, isUserAdmin } = useAuth()
    return (
        <div>
            <header>
                <div className="container_nav">
                    <div className="logo">
                        <a href="/">MERN</a>
                    </div>
                    <nav>
                        <ul className='nav_ul'>
                            {/* {
                                isUserAdmin ?
                                    <li>
                                        <NavLink to="/admin">Admin</NavLink>
                                    </li> : ""
                            } */}
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {
                                isLoggedIn ? (
                                    <>
                                        <li>
                                            <NavLink to="/about">About</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/services">Service</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/contact">Contact</NavLink>
                                        </li>
                                        {
                                            isUserAdmin ?
                                                <li>
                                                    <NavLink to="/admin">Admin</NavLink>
                                                </li> : ""
                                        }
                                        <li>
                                            <NavLink to="/logout">Logout</NavLink>
                                        </li>
                                    </>) : (
                                    <>
                                        <li>
                                            <NavLink to="/register">Register</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>
                    {
                        isLoggedIn ? (
                            <NavLink className="profile_navbar" to="/profile"><CgProfile className='icon_profile' style={{ fontSize: "3.5rem", color: "white" }} /></NavLink>
                        ) : ""
                    }
                </div>
            </header>
        </div>
    )
}

export default Navbar
