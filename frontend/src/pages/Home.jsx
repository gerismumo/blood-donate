import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <div className="header">
                <nav className='flex flex-row'>
                    <div className="logo">
                        <h2>Blood Donate</h2>
                    </div>
                    <div className="links">
                        <Link to='/About'>About</Link>
                        <Link to='/service'>Services</Link>
                        <Link to='/How'>How to?</Link>
                    </div>
                    <div className="accounts">
                        <button onClick={handleLoginLink}>Login</button>
                        <button onClick={handleRegister}>Register</button>
                    </div>
                </nav>
            </div>
            .
        </div>
    )
}

export default Home;