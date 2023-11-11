import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from './Header';



function Register() {

const[countiesList, setCountiesList] = useState([]);
const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    gender: '',
    bloodType: '',
    donateType: '',
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
    return(
    <>
    <Header />
    <div className="register-page">
        <div className="register-content">
          <div className="reg-header">
            <h2>
                Register Here:
            </h2>
          </div>
          <div className="register-form">
                <form action="">
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
                    <label htmlFor="">Blood Group Type:</label>
                    <select name="bloodType" onChange={handleFormDataChange}>
                        <option value=""></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">0</option>
                    </select>
                    <label htmlFor="">Category</label>
                    <select name="donateType" id="" onChange={handleFormDataChange}>
                        <option value=""></option>
                        <option value="BloodDonor">Blood Donor</option>
                        <option value="recipient">Recipient</option>
                    </select>
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