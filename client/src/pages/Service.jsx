import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'

const Service = () => {
  const images = []
  const { services } = useAuth()
  return (
    <>
      <section className='section-service'>
        <div className="new_container grid">
          {services.map((element, index) => {
            return (
              <div key={index} className="card">
                <div className="card-img">
                  <img src="/images/MERN2.jpg" alt="" width="550" height="400" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p className='provider'>{element.provider}</p>
                    <p className='price'>{element.price}</p>
                  </div>
                  <h2>{element.service}</h2>
                  <p className='desc'>{element.description}</p>
                </div>
              </div>
            )
          })}

        </div>
      </section>
    </>
  )
}

export default Service
