import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")
    const [services, setServices] = useState([])
    const [allUsersData, setAllUsersData] = useState("")
    const [allContactsData, setAllContactsData] = useState("")

    const storeToken = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const isLoggedIn = !!token
    const isUserAdmin = user.isAdmin

    const logoutUser = () => {
        setToken("")
        return localStorage.removeItem('token')
    }

    const userAuthentication = async () => {
        try {
            if (token) {
                const response = await fetch("http://localhost:5000/api/auth/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data.userData)
                }
                try {
                    if (token) {
                        const response = await fetch("http://localhost:5000/api/auth/user", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        if (response.ok) {
                            const data = await response.json()
                            setUser(data.userData)
                        }
                        else {
                            setUser("")
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/service", {
                method: "GET"
            })
            if (response.ok) {
                const data = await response.json()
                setServices(data)
            }
        } catch (error) {
            console.log("Services Error: ", error)
        }
    }

    const getAllUsers = async () => {
        try {
            if (token) {
                const response = await fetch("http://localhost:5000/api/admin/users", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setAllUsersData(data)
                }
            }
        } catch (error) {
            console.log("Admin Data Error: ", error)
        }
    }

    const getAllContacts = async () => {
        try {
            if (token) {
                const response = await fetch("http://localhost:5000/api/admin/contact", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setAllContactsData(data)
                }
            }
        } catch (error) {
            console.log("Admin Data Error: ", error)
        }
    }

    useEffect(() => {
        userAuthentication()
        getServices()
        getAllUsers()
        getAllContacts()
    }, [token])

    return <AuthContext.Provider value={{ isLoggedIn, storeToken, logoutUser, user, services, allUsersData, allContactsData, isUserAdmin }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useAuth Method Used Outside Provider")
    }
    return authContextValue
}
