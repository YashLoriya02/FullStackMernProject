import React, { useState } from 'react'
import Analytics from '../components/Analytics/Analytics'
import { useAuth } from '../store/auth'

const Home = () => {
    const { user, isLoggedIn } = useAuth()
    return (
        <>
            {/* SECTION 1  */}
            <main>
                <section className='section-hero'>
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>
                                <span style={{ fontSize: "5rem" }}>Hello,
                                    {
                                        isLoggedIn ? <span style={{ color: "var(--btn-color)" }}> {user.username}</span> : " User"
                                    }
                                </span>
                            </p>
                            <h1>Welcome to <span className='mern'>MERN</span> Stack</h1>
                            <p>
                                Are you ready to make your Website to the next level with
                                cutting-edge Creativity? Look no further! By using MERN Stack,
                                we specialize in providing innovative services and solutions
                                tailored to meet your unique needs.
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Connect now</button>
                                </a>
                                <a href="/services">
                                    <button className="btn secondary-btn">Learn More</button>
                                </a>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="/images/home.png"
                                alt=""
                                width="500"
                                height="500"
                            />
                        </div>
                    </div>
                </section>
            </main >

            {/* SECTION 2 */}

            <Analytics />

            {/* SECTION 3 */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img
                            src="/images/design.png"
                            alt="coding together"
                            width="400"
                            height="500"
                        />
                    </div>

                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>
                            Ready to take the first step towards a more efficient and secure
                            Website and Server? Try MERN today for a free consultation and
                            let's discuss How MERN can help your Website to run properly and thrive in
                            the digital age .
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn btn_extra">Connect now</button>
                            </a>
                            <a href="/services">
                                <button className="btn secondary-btn">Learn more</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Home
