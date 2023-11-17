import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';

function Login() {
  const navigate = useNavigate();
  const[loginSuccess, setLoginSuccess] = useState(false);
  const[loginForm, setLoginForm] = useState(true);
  const[donorQuestions, setDonorQuestions] = useState(false);
  const[receiverQuestions, setReceiverQuestions] = useState(false);
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

    const requiredFields =['email','password'];

            for (const field of requiredFields) {
            if (!formData[field]) {
                toast.error(`Please provide a value for ${field}`);
                return;
            }
            }
    
    // console.log(formData);
    const login = `${process.env.REACT_APP_DATABASE_API}/api/loginUser`;

    const LoginData = async() => {
      try {
        const response = await axios.post(login, {
          formData
        }, {
          'Content-Type': 'application/json'
        });
        const success = response.data.success;
        console.log('success',success)

        if(success) {
          const loginDetail = response.data.data;
          localStorage.setItem('donateUser', JSON.stringify(loginDetail));
          let user = JSON.parse(localStorage.getItem('donateUser'));
          console.log('user', user);
          const bloodType = user[0].blood_type;
          const userType = user[0].user_type;

          if(user[0].role === 'admin') {
            navigate('/usersPage');
          }else {
            if(bloodType !== null &&  userType !== null && userType === 'BloodDonor') {
              navigate('/receiversPage');
            }else if (bloodType !== null &&  userType !== null && userType === 'BloodRecipient') {
              navigate('/donorsPage');
            } else {
              setLoginForm(false); 
              setLoginSuccess(true);
            }
          }
        } else {
          toast.error('Wrong credentials! please try again')
        }
       
       
      } catch (error) {
        toast.error(error.message);
      }
    }
    LoginData();
  };
  const[loginType, setLoginType] = useState({
    loginAs: '',
    bloodType:'',
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
    const requiredField = ['loginAs', 'bloodType'];

            for (const field of requiredField) {
            if (!loginType[field]) {
                toast.error(`Please provide a value for ${field}`);
                return;
            }
            }
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
        const data = response.data.data;
        console.log(data);
        console.log(loginType);
        const category = loginType.loginAs;

        if(success) {
          if(category === 'BloodDonor') {
            setLoginSuccess(false);
            setDonorQuestions(true);
            setReceiverQuestions(false);
          } else if(category === 'BloodRecipient') {
            setLoginSuccess(false);
            setReceiverQuestions(true);
            setDonorQuestions(false);
          } else {
            toast.error('Please select Blood Type');
          }
          // navigate('/donorsPage');
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

  const [donorQuizes, setDonorQuizes] = useState({
    age: '',
    weight: '',
    frequency: '',
    history: '',
  });

  const questionsChange = (e) => {
    const {name, value} = e.target;
    setDonorQuizes((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const submitDonorQuestions = (e) => {
    e.preventDefault();
    const donorFields = ['age','weight', 'frequency', 'history'];

      for(const field of donorFields) {
        if(!donorQuizes[field]) {
          toast.error(`Please provide a value for ${field}`);
          return;
        }
      }
      console.log(donorQuizes);

      const donor_api_questions = `${process.env.REACT_APP_DATABASE_API}/api/insertDonorQuestions`;

      const postDonor = async() => {
        try {
          const response = await axios.post(donor_api_questions, {
            donorQuizes
          }, {
            headers: {
              'Content-Type' : 'application/json'
            }
          });

          console.log(response);
          const success = response.data.success;
        if(success) {
          // await handleSubmit();
          // navigate('/receiversPage')
          setLoginForm(true);
          setDonorQuestions(false);
          setReceiverQuestions(false);
          setLoginSuccess(false);
        } else {
          toast.error('Failed to submit'); 
          setDonorQuestions(false);
          setReceiverQuestions(false);
          setLoginSuccess(false);
          setLoginForm(true);
        }

        } catch (error) {
          toast.error(error.message);
        }
      }
      postDonor();
  }

  const[receiverQuizes, setReceiverQuizes] = useState({
    allergy: '',
    condition: '',
    purpose: '',
    requirements: '',
  });

  const receiverQuestionsChange = (e) => {
    const {name, value} = e.target;
    setReceiverQuizes((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const submitReceiverQuestions = (e) => {
    e.preventDefault();

    const receiverFields = ['allergy', 'condition', 'purpose', 'requirements'];

    for (const field of receiverFields) {
      if(!receiverQuizes[field]) {
        toast.error(`Please provide a field for ${field}`);
     }
    }
    console.log(receiverQuizes);

    const receiver_api_questions = `${process.env.REACT_APP_DATABASE_API}/api/insertReceiverQuestions`;

    const postReceiver = async () => {
      try {
        const response = await axios.post(receiver_api_questions, {
          receiverQuizes
        }, {
          headers: {
            'Content-Type' : 'application/json'
          }
        });

        console.log(response);
        const success = response.data.success;
        if(success) {
          // await handleSubmit();
          setLoginForm(true);
          setDonorQuestions(false);
          setReceiverQuestions(false);
          setLoginSuccess(false);
        } else {
          toast.error('Failed to submit'); 
          setDonorQuestions(false);
          setReceiverQuestions(false);
          setLoginSuccess(false);
          setLoginForm(true);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    postReceiver();
}

  return (
    <>
      <Header />
      <div className="login-page">
        <ToastContainer />
        <div className="login-content">
        {loginForm && (
          <>
          <div className="log-header">
              <h2>
                Login Here
              </h2>
            </div>
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
              <div className="button">
              <button type="submit">Login</button>
              </div>
            </form>
          </div>
          </>
            
        )}
        
        {loginSuccess && (
          <div className="login-as">
            <h2>Login As</h2>
            <div className="login-as-form">
              <form onSubmit={submitLoginAs}>
                <label htmlFor="">Category</label>
                <select name="loginAs" onChange={loginAsChange}>
                    <option value=""></option>
                    <option value="BloodDonor">Blood Donor</option>
                    <option value="BloodRecipient">Blood Recipient</option>
                  </select>
                  <label htmlFor="">Blood Type</label>
                  <select name="bloodType" onChange={loginAsChange}>
                        <option value=""></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">0</option>
                    </select>
                    <div className="button">
                      <button type='submit'>Submit</button>
                    </div>
              </form>
            </div>
          </div>
        )}

        {donorQuestions && (
          <div className="login-as">
            <h2>Questions</h2>
            <div className="login-as-form">
              <form onSubmit={submitDonorQuestions}>
                 <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  name='age' 
                  min='0'
                  onChange={questionsChange}
                />
                <label htmlFor="weight">Weight</label>
                <input 
                 type="number" 
                 name='weight'
                 min='0'  
                 onChange={questionsChange}
                 />
                <label htmlFor="frequency">Frequency of Donations</label>
                <select name="frequency" id="frequency" onChange={questionsChange}>
                  <option value=""></option>
                  <option value="Regular">Regular</option>
                  <option value="Occasional">Occasional</option>
                </select>
                <label htmlFor="history">Health History</label>
                <select name="history" id="history" onChange={questionsChange}>
                  <option value=""></option>
                  <option value="Recent Illness or Infection">Recent Illness or Infection</option>
                  <option value="Medications Currently Taking">Medications Currently Taking</option>
                  <option value="Recent Travels">Recent Travels</option>
                </select>
                <div className="button">
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {receiverQuestions && (
          <div className="login-as">
            <h2>Questions</h2>
            <div className="login-as-form">
              <form onSubmit={submitReceiverQuestions}>
                <label htmlFor="allergy">Any Allergies or Sensitivities</label>
                <select name="allergy" id="allergy" onChange={receiverQuestionsChange}>
                  <option value=""></option>
                  <option value="No">No</option>
                  <option value="yes">Yes</option>
                </select>
                <label htmlFor="condition">Any medical Condition Requiring Transfusion</label>
                <select name="condition" id="condition" onChange={receiverQuestionsChange}>
                  <option value=""></option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <label htmlFor="purpose">Purpose of the Blood Transfusion</label>
                <textarea name="purpose" id="purpose" cols="30" rows="5" onChange={receiverQuestionsChange}></textarea>
                <label htmlFor="requirements">Any special instructions or requirements</label>
                <textarea name="requirements" id="requirements" cols="30" rows="5" onChange={receiverQuestionsChange}></textarea>
                <div className="button">
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}

         </div>  
      </div>
      <Footer />
    </>
  );
}

export default Login;
