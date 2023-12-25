import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  })

  const { storeToken } = useAuth()

  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUser({
      ...user,
      [name]: value
    })
  }

  const handlePassword = () => {
    setSelected(!selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if (response.ok) {
        storeToken(data.token)
        setUser({
          username: "",
          email: "",
          phone: "",
          password: ""
        })
        toast.success("Registered Successfully.", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate("/")
      }
      else {
        {
          data.extraDetails ? toast.error(data.extraDetails, {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }) : toast.error(data.message, {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt=""
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">
                Registration Form
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    value={user.username}
                    name='username'
                    placeholder='Enter Your Username'
                    id='username'
                    autoComplete='off'
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    name='email'
                    placeholder='Enter Your Email'
                    id='email'
                    autoComplete='off'
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    value={user.phone}
                    name='phone'
                    placeholder='Enter Your Phone'
                    id='phone'
                    autoComplete='off'
                    onChange={handleInput}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type={selected ? "text" : "password"}
                    value={user.password}
                    name='password'
                    placeholder='Enter Your Password'
                    id='password'
                    autoComplete='off'
                    onChange={handleInput}
                    required
                  />
                  <div onClick={handlePassword} className="icon_eyes2">
                    {selected ? <FaEye className="icon_eye" /> : <FaEyeSlash className="icon_eye" />}
                  </div>
                </div>
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Register
