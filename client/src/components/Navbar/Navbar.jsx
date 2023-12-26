import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../../store/auth'

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
                </div>
            </header>
        </div>
    )
}

export default Navbar
