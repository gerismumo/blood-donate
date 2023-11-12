import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';



function Register() {

const[countiesList, setCountiesList] = useState([]);
const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    phoneNumber:'',
    gender: '',
    password: '',
    confirmPassword: '',
});

const handleFormDataChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
}

const counties_api = `${process.env.REACT_APP_DATABASE_API}/api/countiesData`;
    useEffect(() => {
        const fetchCounties = async() => {
            try {
                const response = await axios.get(counties_api)
                setCountiesList(response.data.counties);
            } catch(error) {
                console.error(error);
            }
        }

        fetchCounties();
    }, [counties_api]);

    const options = countiesList.map(county => ({
        value: county.name,
        label: county.name,
      }));

      const handleChange = (selectedOption) => {
        setFormData({...formData, county: selectedOption.value});
      }

      console.log('formData',formData);

      const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            password: formData.password,
            county: formData.county,
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Password does not match');
        } 
        const Submit_api = `${process.env.REACT_APP_DATABASE_API}/api/registerUser`;
        const submitData = async() => {
            try {
                const response = await axios.post(Submit_api, {
                    requestData
                }, {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                });
                console.log(response);
            } catch(error) {
                console.error(error);
            }
        }
        submitData();
      }
    return(
    <>
    <Header />
    <ToastContainer />
    <div className="register-page">
        <div className="register-content">
          <div className="reg-header">
            <h2>
                Register Here:
            </h2>
          </div>
          <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <label>FirstName:</label>
                    <input type="text" 
                    name='firstName' 
                    placeholder='John' 
                    required
                    onChange={handleFormDataChange}
                    />
                    <label htmlFor="">LastName:</label>
                    <input type="text" 
                    name='lastName' 
                    placeholder='Doe' 
                    required
                    onChange={handleFormDataChange}
                    />
                    <label htmlFor="">Email:</label>
                    <input type="email" 
                    name='email' 
                    placeholder='johndoe@gmail.com' 
                    required 
                    onChange={handleFormDataChange}
                    />
                    <label htmlFor="">Phone:</label>
                    <input type="tel" 
                    name='phoneNumber'
                    required
                    onChange={handleFormDataChange}
                     />
                    <div className='radio'>
                        <label htmlFor="male">Gender</label>
                        <div className="radio-1">
                            <input type="radio" 
                            name="gender" 
                            id="male" 
                            value='male'
                            onChange={handleFormDataChange}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="radio-2">
                            <input type="radio" 
                            name="gender" 
                            id="female" 
                            value='female'
                            onChange={handleFormDataChange}
                            />
                            <label htmlFor="female">Female</label>
                        </div> 
                    </div>
                    <label htmlFor="">County</label>
                    <Select 
                    options={options}
                    onChange={handleChange}
                    />
                    <label htmlFor="">Password:</label>
                    <input type="text" 
                    name='password' 
                    required
                    onChange={handleFormDataChange}
                    />
                    <label htmlFor="">Confirm Password</label>
                    <input type="text" 
                    name='confirmPassword' 
                    require 
                    onChange={handleFormDataChange}
                    />
                    <div className="register-button">
                        <button type='submit'>Register</button>
                    </div>
                </form>
                
            </div>
        </div>
        </div>
    </>
        
    )
}

export default Register;