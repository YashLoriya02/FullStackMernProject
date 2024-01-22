import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { token, isUserAdmin } = useAuth()
    const [data, setData] = useState({
        old: "",
        new: "",
        confirm: ""
    })

    const passwordChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value,
        });
    }

    const submitPasswordForm = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(`http://localhost:5000/api/auth/users/changePassword/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            const jsonData = await response.json()
            if (response.ok) {
                toast.success(jsonData.message)
                setData({
                    old: "",
                    new: "",
                    confirm: ""
                })
                if (isUserAdmin) {
                    navigate('/admin/users')
                }
                else {
                    navigate('/')
                }
            }
            else {
                toast.error(jsonData.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }
    return (
        <>
            <h1 style={{ textAlign: "center", margin: "2rem 0", letterSpacing: "0.2rem" }}>Change Password</h1>
            <form onSubmit={submitPasswordForm} className="passwords_form">
                <div className="pass">
                    <label htmlFor="old_password">
                        Old Password
                    </label>
                    <input type="text" id='old_password' name='old' onChange={passwordChangeHandler} value={data.old} placeholder='Old Password' required />
                </div>
                <div className="pass">
                    <label htmlFor="new_password">
                        New Password
                    </label>
                    <input type="text" id='new_password' name='new' onChange={passwordChangeHandler} value={data.new} placeholder='New Password' required />
                </div>
                <div className="pass">
                    <label htmlFor="cnf_password">
                        Confirm New Password
                    </label>
                    <input type="text" id='cnf_password' name='confirm' onChange={passwordChangeHandler} value={data.confirm} placeholder='Confirm New Password' required />
                </div>
                <button className='pass_btn' type="submit">Set Password</button>
            </form>
        </>
    )
}

export default ChangePassword
