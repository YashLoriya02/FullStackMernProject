import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { NavLink, Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditUser = () => {
    const navigate = useNavigate();
    const { token } = useAuth()
    const [user, setUser] = useState("")
    const { id } = useParams()

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.message)
                navigate('/admin/users')
            }
        } catch (error) {
            toast.success(error)
            console.log(error)
        }
    }

    const handleSave = (e) => {
        console.log(user)
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <div className="edit_container">
                <h1 className="edit_head">
                    Update
                </h1>
                <div className="inner_edit_container">
                    <label htmlFor="">Userame</label>
                    <input name='username' type='text' value={user.username} onChange={handleSave} />
                </div>
                <div className="inner_edit_container">
                    <label htmlFor="">Email</label>
                    <input name='email' type='text' value={user.email} onChange={handleSave} />
                </div>
                <div className="inner_edit_container">
                    <label htmlFor="">Phone</label>
                    <input name='phone' type='text' value={user.phone} onChange={handleSave} />
                </div>
                <Link className="changePasswordLinkEditUser" to={`/changePassword/${user._id}`}>Change Password</Link>
                <div className='btns_edit_page'>
                    <NavLink className="edit_page_link" style={{ color: "white", fontSize: "2rem" }} to="/admin/users" >Back</NavLink>
                    <button className="send_btn" onClick={updateUser}>Send</button>
                </div>

            </div>
        </>
    )
}

export default EditUser
