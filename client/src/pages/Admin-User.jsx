import React from 'react'
import { useAuth } from '../store/auth'

const AdminUser = () => {
  const { allUsersData } = useAuth()
  return (
    <>
      {
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
      }
    </>
  )
}

export default AdminUser
