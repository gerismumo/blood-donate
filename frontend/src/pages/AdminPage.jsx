import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function AdminPage(){
    const[usersList, setUsersList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
    },[user, navigate]);

    const logout = () => {
        localStorage.removeItem('donateUser');
        navigate('/');
    }

    const handleHomeTab = () => {
        navigate('/');
    }

    const users_api = `${process.env.REACT_APP_DATABASE_API}/api/usersList`;

    const usersData = useCallback(async () => {
        try {
            const response = await axios.get(users_api);
            setUsersList(response.data.data);
        }catch(error) {
            console.log(error);
            setError('Error fetching data. Please try again later.')

        }
    },[users_api]);
   
    useEffect(() => {
        usersData();
    },[usersData]);

    const updatedList = usersList ? 
    usersList.filter((user) => {
        return (
            (user.first_name && user.first_name.toLowerCase().includes(searchQuery.toLowerCase()))||
            (user.last_name && user.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.blood_type && user.blood_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.user_type && user.user_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.user_gender && user.user_gender.toLowerCase().includes(searchQuery.toLowerCase()))||
            (user.user_phone && user.user_phone.toLowerCase().includes(searchQuery.toLowerCase()))||
            (user.user_email && user.user_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (user.user_county && user.user_county.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }): [];
    // const filteredList = usersList.filter(user => user.blood_type  !== null && user.user_type !== null);
    // console.log('filteredList',filteredList);

    const handleDeleteUser = async(userId) => {
        console.log('handleDeleteUser',userId);
        const delete_api = `${process.env.REACT_APP_DATABASE_API}/api/deleteUser/${userId}`;
        console.log('delete_api',delete_api);
        const deleteUser = async() => {
            try {
                const response = await axios.delete(delete_api);
                console.log(response);
                await usersData();

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
        { error ? (
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
                                <option value="/questionsPage">Questions Page</option>
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
                    <h1>Users List</h1>
                    <div className="users-table">
                        <table>
                            <thead>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>County</th>
                                <th>Category</th>
                                <th>Blood Group</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {updatedList.map(user => (
                                    <tr key={user.user_id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.user_email}</td>
                                        <td>{user.user_phone}</td>
                                        <td>{user.user_gender}</td>
                                        <td>{user.user_county}</td>
                                        <td>{user.user_type}</td>
                                        <td>{user.blood_type}</td>
                                        <td><button onClick={() => handleDeleteUser(user.user_id)}>Delete</button></td>
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

export default AdminPage;