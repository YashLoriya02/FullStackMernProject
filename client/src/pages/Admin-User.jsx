import React from 'react'
import { useAuth } from '../store/auth'
import { toast } from "react-toastify"

const AdminUser = () => {
  const { allUsersData, token, setAllUsersData } = useAuth()

  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userEmail}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        setAllUsersData((previousUserData) => previousUserData.filter((user) => user.email !== userEmail))
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section>
        <div className="admin_container2">
          <table>
            <thead>
              <tr>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Username</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Email</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Phone</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Edit</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Delete</p></th>
              </tr>
            </thead>

            {/* {
        allUsersData ?
          (
            allUsersData.map((data, index) => {
              return (
                <div className='users-admin' key={index}>
                  <h2>{data._id}</h2>
                  <h2 className='extra_h2'>{data.username}</h2>
                  <h2>{data.email}</h2>
                  <h2>{data.phone}</h2>
                </div>
              )
            })
          ) :
          <div className=" content">
            <h2 style={{ textAlign: "center", marginTop: "10rem", fontSize: "10rem" }} className="header h2">User is Not an Admin</h2>
          </div>
      } */}

            {
              allUsersData ?
                (
                  allUsersData.map((data, index) => {
                    return (
                      <tbody key={index}>
                        <tr style={{ marginBottom: "2rem", border: "2px solid white" }}>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td> <button className='edit_btn'>Edit</button></td>
                          <td> <button onClick={() => deleteUser(data.email)} className='delete_btn'>Delete</button></td>
                        </tr>
                      </tbody>
                    )
                  })
                ) :
                <div className=" content">
                  <h2 style={{ marginTop: "10rem", fontSize: "6rem" }} className="header h2">User is Not an Admin</h2>
                </div>
            }
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminUser


