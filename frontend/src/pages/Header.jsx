import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    const handleHomeTab = () => {
        navigate('/');
    }
    return (
        <div className="main-header">
            <nav>
                <div className="logo">
                    <h2>Blood Donate</h2>
                </div>
                <div className="links">
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={handleHomeTab}>Home</button>
                </div>
            </nav>
        </div>
    )
}

export default Header;