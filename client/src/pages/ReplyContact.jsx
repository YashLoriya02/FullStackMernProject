import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

const ReplyContact = () => {

    const navigate = useNavigate()
    const [message, setMessage] = useState({
        query: ""
    })
    const { id } = useParams()
    const { token } = useAuth()

    const submitResponse = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/admin/contact/reply/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(message)
        })
        const data = await response.json()
        if (response.ok) {
            toast.success(data.message)
            setMessage({
                query : ""
            })
            navigate('/admin/contacts')
        }
        else {
            toast.error(data.message)
        }
    }

    const handleResponseChange = (e) => {
        setMessage({
            query: e.target.value
        })
    }

    return (
        <>
            <form onSubmit={submitResponse}>
                <div className="mainReplyContainer">
                    <div className="reply_container">
                        <label style={{ marginTop: "3rem" }}>Type and Send Response</label>
                        <textarea onChange={handleResponseChange} name="message" id="messageField" value={message.query} cols="65" rows="8"></textarea>
                    </div>
                    <button className='btn_reply' type='submit'>Send</button>
                </div>
            </form>
        </>
    )
}

export default ReplyContact
