import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home () {
    const navigate = useNavigate();
    const handleLoginLink = () => {
        navigate('/login');
    }
    const handleRegister =() => {
        navigate('/register');
    }
    return (
        <div className="home-page">
            <div className="header ">
                <nav>
                    <div className="logo">
                        <h2>Blood Connect</h2>
                    </div>
                    <div className="links-account">
                        <div className="links">
                            <a href="#about">About</a>
                            <a href="#service">Services</a>
                            <a href="#howto">How to?</a>
                        </div>
                        <div className="accounts">
                            <button onClick={handleLoginLink}>Login</button>
                            <button onClick={handleRegister}>Register</button>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="home-content">
            <section className="about" id="about">
                <div className="container">
                    <div className="image">
                    <img src="/images/about.png" alt="" />
                    </div>
                    <div className="text">
                    <h1>About us</h1>
                    <h2>Welcome to Blood Connects, a website where blood donors and recipients can connect!</h2>
                        <p>
                        Blood donation is a vital and lifesaving act, but it can be difficult to find donors, especially those with rare blood types. This website aims to make it easier for donors and recipients to connect, so that everyone who needs blood can get it.
                        </p>
                    </div>
                </div>
                <div className="category-type">
                        <div className="donors" id='service'>
                            <h1>Donors</h1>
                            <div className="donors-text">
                                <ul>
                                    <li>
                                    Register and create a profile to share your blood type, contact information, and availability.
                                    </li>
                                    <li>
                                    Browse the list of recipients who need blood with the same blood type as you.
                                    </li>
                                    <li>
                                    Contact recipients directly to schedule a donation.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="receipt">
                            <h1>Recipients</h1>
                            <div className="receipt-text">
                                <ul>
                                    <li>
                                    Search for donors by blood type and location.
                                    </li>
                                    <li>
                                    Contact donors directly to schedule a donation.
                                    </li>
                                    <li>
                                    Learn more about blood donation and why it is so important.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="matters" id="about">
                <div className="text">
                    <h1> Why It Matters</h1>
                    </div>
                <div className="container">
                    <div className="text-p">
                        <p>
                        Every three seconds, someone in the United States needs blood. Blood is used to treat a variety of medical conditions, including cancer, trauma, and blood disorders.

                        One blood donation can save up to three lives. And, because blood has a limited shelf life, there is a constant need for new donors.
                        </p>
                    </div>
                    <div className="image">
                    <img src="/images/donatelove.jpg" alt="" />
                    </div>
                </div>
                </section>
                <div className="how-to" id='howto'>
                    <h1>How to Donate Blood</h1>
                    <div className="steps-info">
                        <div className="steps">
                            <ul>
                                <li>
                                    At least 18 years old
                                </li>
                                <li>
                                    Weigh at least 110 pounds
                                </li>
                                <li>
                                In good health
                                </li>
                            </ul>
                        </div>
                        <div className="step-text">
                            <p>
                            To donate blood, simply visit a local blood donation center or mobile blood drive. The donation process typically takes about one hour.
                            </p>
                        </div>
                    </div>   
                </div>
                <div className="get-involve">
                    <h1>Get Involved Today</h1>
                    <div className="get-involve-text">
                        <p>
                        If you are eligible to donate blood, we encourage you to register on our website and create a profile. By doing so, you can help to save lives!
                        </p>
                    </div>
                </div>
                <div className="end-text">
                    <h2>Thank you for your support!</h2>
                </div>
            </div>
            <footer>
            <p>&copy; 2023 BloodConnect. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home;