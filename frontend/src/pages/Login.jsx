import React from 'react';
import Header from './Header';

function Login() {
    return (
        <>
        <Header />
            <div className="login-page">
                <div className="login-form">
                    <form action="">
                        <label htmlFor="">Email:</label>
                        <input type="email" name='email' placeholder='johndoe@gmail.com'required />
                        <label htmlFor="">Password:</label>
                        <input type="text" name='passwird' required />
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default Login;