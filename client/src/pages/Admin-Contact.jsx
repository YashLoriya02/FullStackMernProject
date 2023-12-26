import React from 'react'
import { useAuth } from '../store/auth'

const AdminContact = () => {
  const { allContactsData } = useAuth()
  return (
    <>
      {
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
      }
    </>
  )
}

export default AdminContact
