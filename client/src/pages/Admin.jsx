import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'


const Admin = () => {
    return (
        <>
            <header>
                <nav>
                    <div className="admin_container container">
                            <NavLink className="link_admin" to="/admin/users">Users</NavLink>
                            <NavLink className="link_admin" to="/admin/contacts">Contact</NavLink>
                            <NavLink className="link_admin" to="/">Home</NavLink>
                    </div>
                </nav>
            </header>
            <Outlet></Outlet>
        </>
    )
}

export default Admin
