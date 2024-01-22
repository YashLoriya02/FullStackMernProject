import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [mail, setMail] = useState("")
    const forgotSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            console.log(mail)
            const response = await fetch(`http://localhost:5000/api/auth/forgotPassword/${mail}`, {
                method: "GET",
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.message)
                setMail("")
                navigate('/login')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleForgotChange = (e) => {
        setMail(e.target.value)
    }
    return (
        <>
            <div className="mainForgotContainer">
                <div className="forgot_head">
                    <h1 style={{ letterSpacing: "0.5rem", textTransform: "uppercase" }}>Forgot Password</h1>
                </div>
                <form onSubmit={forgotSubmitHandler}>
                    <div className="profile_container">
                        <div className="inner_container">
                            <label htmlFor="forgotEmail">
                                Email
                            </label>
                            <input name='email' value={mail} type="text" onChange={handleForgotChange} id='forgotEmail' />
                        </div>
                        <button className='btn btn_forgot' type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
