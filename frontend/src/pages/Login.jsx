import React from 'react';

function Login() {
    return (
        <div className="login-page">
            <div className="login-form">
                <form action="">
                    <input type="email" name='email' placeholder='johndoe@gmail.com'required />
                    <input type="text" name='passwird' required />
                </form>
            </div>
        </div>
    )
}

export default Login;