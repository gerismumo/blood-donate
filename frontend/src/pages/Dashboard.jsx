import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const[usersList, setUsersList] = useState([]);

    const handleHomeTab = () => {
        navigate('/');
    }

    const users_api = `${process.env.REACT_APP_DATABASE_API}/api/usersList`;

    useEffect(() => {
        const usersData = async () => {
            try {
                const response = await axios.get(users_api);
                setUsersList(response.data.data);
            }catch(error) {
                console.log(error);
            }
        }
        usersData();
    },[users_api]);
    console.log(usersList);
    const filteredList = usersList.filter(user => user.blood_type  !== null && user.user_type !== null);
    console.log('filteredList',filteredList);
    return(
        <>
        <div className="dashboard">
        <div className="main-header">
            <nav>
                <div className="logo">
                    <h2>Blood Donate</h2>
                </div>
                <div className="links">
                    <button onClick={handleHomeTab}>Home</button>
                </div>
            </nav>
        </div>
            <div className="dashboard-content">
                <div className="dashboard-text">
                    <h1>Users List</h1>
                </div>
                {
                    filteredList.map(user => (
                        <div className="users-cards" key={user.user_id}>
                        <div className="img">
                            <img src="/images/personicon.png" alt="" />
                        </div>
                        <div className="card-text">
                            <div className="name">
                                <p>{user.first_name+ ' ' + user.last_name}</p>
                            </div>
                            <div className="blood-type">
                                <p>BloodGroup: {user.blood_type}</p>
                            </div>
                            <div className="category-type">
                                <p>Category: {user.user_type}</p>
                            </div>
                            <div className="gender">
                                <p>Gender: {user.user_gender}</p>
                            </div>
                            <div className="phone">
                                <p>Contact: {user.user_phone}</p>
                            </div>
                            <div className="email">
                                <p>Email: {user.user_email}</p>
                            </div>
                            <div className="location">
                                <p>Location: {user.user_county}</p>
                            </div>
                        </div>
                    </div>
                    ))
                }
                
            </div>
        </div>
        </>
    )
}

export default Dashboard;