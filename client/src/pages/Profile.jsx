import React from 'react'
import { useAuth } from '../store/auth'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user } = useAuth()

    return (
        <>
            <div className="profile_head">
                <h1 style={{ textAlign: "center", marginTop: "3rem", letterSpacing: "0.5rem", textTransform: "uppercase" }}>Profile</h1>
            </div>
            <div className="profile_container">
                <div className="inner_container">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input type="text" id='username' contentEditable="false" value={user.username} />
                </div>
                <div className="inner_container">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="text" id='email' value={user.email} />
                </div>
                <div className="inner_container">
                    <label htmlFor="phone">
                        Phone
                    </label>
                    <input type="text" id='phone' value={user.phone} />
                </div>
                <Link className="changePasswordLink" to={`/changePassword/${user._id}`}>Change Password</Link>
            </div>
        </>
    )
}

export default Profile
