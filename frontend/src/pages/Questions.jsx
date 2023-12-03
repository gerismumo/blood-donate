import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Questions(){
    const[usersList, setUsersList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [donorQuestions, setDonorQuestions] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    let user = JSON.parse(localStorage.getItem('donateUser'));
    const navigate = useNavigate();
    useEffect(() => {
        if(user === null) {
            navigate('/');    
        }else if(user[0].role === 'user') {
            navigate('/');
        }else {
            setIsAuthenticated(true);
        }
    },[user,navigate]);
    
    const logout = () => {
        localStorage.removeItem('donateUser');
        navigate('/');
    }
    const handleHomeTab = () => {
        navigate('/');
    }

    const users_api = `${process.env.REACT_APP_DATABASE_API}/api/usersList`;

    const usersData = async () => {
        try {
            const response = await axios.get(users_api);
            setUsersList(response.data.data);
        }catch(error) {
            console.log(error);
            setError('Error fetching data. Please try again later.')
        }
    }
   
    useEffect(() => {
        usersData();
    },[]);
    console.log('usersList',usersList);
    const donor_api = `${process.env.REACT_APP_DATABASE_API}/api/donorQuestions`;

    const donorData = async () => {
        try {
            const response = await axios.get(donor_api);
            setDonorQuestions(response.data.data);
        }catch(error) {
            console.log(error);
        }
    }
   
    useEffect(() => {
        donorData();
    },[]);

    console.log('donor', donorQuestions);

    const combinedData = donorQuestions && donorQuestions.map((donorObj) => {
        // Find the corresponding user object in usersList
        const matchingUser = usersList.find((userObj) => userObj.user_id === donorObj.user_id);
      
        // Return a new object combining information from donor and usersList
        return {
          user_id: donorObj.user_id,
          age: donorObj.age,
          weight: donorObj.weight,
          frequency: donorObj.frequency,
          history: donorObj.history,
          first_name: matchingUser ? matchingUser.first_name : null,
          last_name: matchingUser ? matchingUser.last_name : null,
        };
      });
      
      console.log('combinedData',combinedData);

    const updatedList = combinedData ? 
    combinedData.filter((data) => {
        return (
            (data.first_name && data.first_name.toLowerCase().includes(searchQuery.toLowerCase()))||
            (data.last_name && data.last_name.toLowerCase().includes(searchQuery.toLowerCase()))||
            (data.weight && data.weight.toString().toLowerCase().includes(searchQuery.toLowerCase()))||
            (data.age && data.age.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
            (data.frequency && data.frequency.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (data.history && data.history.toLowerCase().includes(searchQuery.toLowerCase()) )    
        )
    }): [];
    // const filteredList = usersList.filter(user => user.blood_type  !== null && user.user_type !== null);
    // console.log('filteredList',filteredList);

    const handleDelete = async(userId) => {
        console.log('handleDeleteUser',userId);
        const delete_api = `${process.env.REACT_APP_DATABASE_API}/api/deleteDonorQuestion/${userId}`;
        console.log('delete_api',delete_api);
        const deleteUser = async() => {
            try {
                const response = await axios.delete(delete_api);
                console.log(response);
                await donorData();

            } catch(error) {
                console.log(error);
            }
        }
        deleteUser();
    }
    
    const [selectedPage, setSelectedPage] = useState('');

    const handlePageChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPage(selectedValue);

        // Redirect to the selected page
        if (selectedValue !== "") {
            navigate(selectedValue);
        }
    };

    return (
        <>
        {error? (
            <p>{error}</p>
        ): isAuthenticated && (
            <>
            <div className="admin-page">
                <div className="main-header">
                    <nav>
                        <div className="logo">
                            <h2>Blood Connect</h2>
                        </div>
                        <div className="search-input">
                            <input
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search...'
                            />
                        </div>
                        <div className="select-page">
                            <select name="page" id="page" value={selectedPage} onChange={handlePageChange}>
                                <option value="">Select a Page</option>
                                <option value='/usersPage'>Users Page</option>
                                <option value="/questionsPage">Donor Questions</option>
                                <option value="/receiverQuestions">Receiver Questions</option>
                            </select>
                        </div>
                        <div className="links">
                            <button onClick={handleHomeTab}>Home</button>
                        </div>
                        <div className="links">
                            <button onClick={logout}>Logout</button>
                        </div>
                    </nav>
                </div>
                <div className="admin-page-content">
                    <h1>Donors Questions List</h1>
                    <div className="users-table">
                        <table>
                            <thead>
                                <th>Fist Name</th>
                                <th>Last Name</th>
                                <th>Weight</th>
                                <th>Age</th>
                                <th>Frequency</th>
                                <th>History</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {updatedList.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.weight}</td>
                                        <td>{user.age}</td>
                                        <td>{user.frequency}</td>
                                        <td>{user.history}</td>
                                        <td><button onClick={() => handleDelete(user.user_id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Footer />
            </>
        )}
        </>
        
    )
}

export default Questions;