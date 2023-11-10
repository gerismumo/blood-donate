import React from 'react';
import Select from 'react-select';

function Register() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];

      const handleChange = (selectedOption) => {
        console.log(selectedOption);
      }
    return(
        <div className="register-page">
            <div className="register-form">
                <label>FirstName:</label>
                <input type="text" name='firstName' placeholder='John' required/>
                <label htmlFor="">LastName:</label>
                <input type="text" name='lastName' placeholder='Doe' required/>
                <label htmlFor="">Email:</label>
                <input type="email" name='email' placeholder='johndoe@gmail.com' required />
                <label htmlFor="">Gender</label>
                <input type="radio" name="male" id="male" />
                <input type="radio" name="female" id="female" />
                <label htmlFor="">Blood Group Type:</label>
                <select name="bloodType">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">0</option>
                </select>
                <label htmlFor="">Category</label>
                <select name="donateType" id="">
                    <option value="BloodDonor">Blood Donor</option>
                    <option value="recipient">Recipient</option>
                </select>
                <label htmlFor="">County</label>
                <Select 
                options={options}
                onChange={handleChange}
                />
            </div>
        </div>
    )
}