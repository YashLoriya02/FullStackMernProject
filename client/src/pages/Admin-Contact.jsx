import React from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'


const AdminContact = () => {
  const { allContactsData, token, setAllContactsData } = useAuth()

  const deleteContact = async (userEmail, userMessage) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contact/${userEmail}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        setAllContactsData((previousUserData) => previousUserData.filter((user) => user.message !== userMessage))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* {
        allContactsData ?
          (
            allContactsData.map((data, index) => {
              return (
                <div className='users-admin' key={index}>
                  <h2 className='extra_h2'>{data.username}</h2>
                  <h2>{data.email}</h2>
                  <div className='message_admin'>{data.message}</div>
                </div>
              )
            })
          ) :
          <div className=" content">
            <h2 style={{ textAlign: "center", marginTop: "10rem", fontSize: "10rem" }} className="header h2">User is Not an Admin</h2>
          </div>
      } */}

      <section>
        <div className="admin_container">
          <table>
            <thead>
              <tr>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Username</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Email</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Message</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Edit</p></th>
                <th><p style={{ fontSize: "4rem" }} className='table_p' >Delete</p></th>
              </tr>
            </thead>
            {
              allContactsData ?
                (
                  allContactsData.map((data, index) => {
                    return (
                      <tbody key={index}>
                        <tr style={{ marginBottom: "2rem", border: "2px solid white" }}>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                          <td>{data.message}</td>
                          <td> <button className='edit_btn'>Edit</button></td>
                          <td> <button onClick={() => deleteContact(data.email, data.message)} className='delete_btn'>Delete</button></td>
                        </tr>
                      </tbody>
                    )
                  })
                ) :
                <div className=" content">
                  <h2 style={{ textAlign: "center", marginTop: "10rem", fontSize: "10rem" }} className="header h2">User is Not an Admin</h2>
                </div>
            }
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminContact
