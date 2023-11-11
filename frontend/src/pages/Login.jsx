import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function Login() {
  const navigate = useNavigate();
  const[loginSuccess, setLoginSuccess] = useState(false);
  const[loginForm, setLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    const login = `${process.env.REACT_APP_DATABASE_API}/api/loginUser`;

    const LoginData = async() => {
      try {
        const response = await axios.post(login, {
          formData
        }, {
          'Content-Type': 'application/json'
        });
        const success = response.data.success;
        if(success) {
          setLoginForm(false); 
          setLoginSuccess(true);
          console.log('successifully logged in');
        }
        const loginDetail = response.data.data;
        console.log(loginDetail);
      } catch (error) {
        console.log(error);
      }
    }
    LoginData();
  };
  const[loginType, setLoginType] = useState({
    loginAs: '',
  });

  const loginAsChange = (e) => {
    const {name, value} = e.target;
    setLoginType((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const submitLoginAs = (e) => {
    e.preventDefault();

    const login_type = `${process.env.REACT_APP_DATABASE_API}/api/loginType`;
    const loginTypes = async() => {
      try {
        const response = await axios.post(login_type, {
          loginType
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const success =response.data.success;
        if(success) {
          navigate('/viewPage');
        }else {
          setLoginSuccess(false);
          setLoginForm(true);
          toast.error('selection error');
        }
      }catch(error) {
        console.error(error);
      }
    }
    loginTypes();

  }

  return (
    <>
      <Header />
      <div className="login-page">
        <ToastContainer />
        {loginForm && (
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
        
        {loginSuccess && (
          <div className="login-as">
            <h2>Login As</h2>
            <div className="login-as-form">
              <form onSubmit={submitLoginAs}>
                <select name="loginAs" onChange={loginAsChange}>
                    <option value=""></option>
                    <option value="BloodDonor">Blood Donor</option>
                    <option value="BloodRecipient">Blood Recipient</option>
                  </select>
                  <button type='submit'>Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
