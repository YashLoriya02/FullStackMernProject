import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoMdContact } from "react-icons/io";
import { useAuth } from '../store/auth';


const Admin = () => {
    const { allUsersData } = useAuth()
    return (
        <>
            {
                allUsersData ?
                    (
                        <>
                            <header>
                                <nav>
                                    <div className="admin_container container">
                                        <NavLink className="link_admin" to="/admin/users"><HiUsers /> Users</NavLink>
                                        <NavLink className="link_admin" to="/admin/contacts"><IoMdContact /> Contacts</NavLink>
                                        <NavLink className="link_admin" to="/"> <FaHome /> Home</NavLink>
                                    </div>
                                </nav>
                            </header>
                            <Outlet></Outlet>
                        </>
                    ) : (
                        <div className=" content">
                            <h2 style={{ textAlign: "center", marginTop: "20rem", fontSize: "7rem" }} className="header h2">User is Not an Admin</h2>
                            <div style={{display : "flex" , justifyContent : "center" , alignItems : "center" , marginTop : "5rem"}} className="btns">
                                <NavLink to="/" >Go Back to Home</NavLink>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Admin
