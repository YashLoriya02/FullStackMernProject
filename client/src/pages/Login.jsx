import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { storeToken } = useAuth()

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePassword = () => {
    setSelected(!selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (response.ok) {
        const data = await response.json()
        storeToken(data.token)
        setUser({
          username: "",
          password: ""
        })
        toast.success("Login Successful.", {
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
        toast.error("Invalid Credentials", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
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
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt=""
                  width="500"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter Your Email"
                    />
                  </div>

                  <div className="password_container">
                    <label htmlFor="password">Password</label>
                    <input
                      type={selected ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Enter Your Password"
                    />
                    <div onClick={handlePassword} className="icon_eyes">
                      {selected ? <FaEye className="icon_eye" /> : <FaEyeSlash className="icon_eye" />}
                    </div>
                  </div>
                  <div className="forgot">
                    <Link className="changePasswordLinkLogin" to={`/forgotPassword`}>Forgot Password?</Link>
                  </div>
                  <button type="submit" className="btn_submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
