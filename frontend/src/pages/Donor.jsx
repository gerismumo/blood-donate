import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Donor() {
    const navigate = useNavigate();
    const[usersList, setUsersList] = useState([]);
    // const [filteredList, setFilteredList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let user = JSON.parse(localStorage.getItem('donateUser'));
    // console.log('user',user);
    useEffect(() => {
        if(user === null) {
            navigate('/');    
        }else if(user[0].user_type !== 'BloodRecipient' || !user[0].role === 'admin') {
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
  
        const filteredList = usersList.filter(user => user.blood_type  !== null && user.user_type !== null && user.user_type ==='BloodDonor')
    

    
    const updatedList = filteredList ? 
    filteredList.filter((user) => {
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

    console.log('filteredList',updatedList);
    return(
        <>
        {isAuthenticated && (
            <>
            <div className="donor-page">
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
                        <div className="links">
                            <button onClick={handleHomeTab}>Home</button>
                        </div>
                        <div className="links">
                            <button onClick={logout}>Logout</button>
                        </div>
                    </nav>
                </div>
                    <div className="donor-content">
                        <div className="donor-text">
                            <h1>Donors List</h1>
                        </div>
                        <div className="cards">
                            {
                                updatedList.map(user => (
                                    <div className="users-cards" key={user.user_id}>
                                    <div className="img">
                                        <img src="/images/personicon.png" alt="" />
                                    </div>
                                    <div className="card-text">
                                        <div className="name">
                                            <p>{user.first_name+ ' ' + user.last_name}</p>
                                        </div>
                                        <div className="blood-type">
                                            <p><span>BloodGroup:</span>{user.blood_type}</p>
                                        </div>
                                        <div className="category-type">
                                            <p><span>Category:</span> {user.user_type}</p>
                                        </div>
                                        <div className="gender">
                                            <p><span>Gender:</span> {user.user_gender}</p>
                                        </div>
                                        <div className="phone">
                                            <p><span>Contact:</span> {user.user_phone}</p>
                                        </div>
                                        <div className="email">
                                            <p><span>Email:</span> {user.user_email}</p>
                                        </div>
                                        <div className="location">
                                            <p><span>County:</span> {user.user_county}</p>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                            
                        </div>
                        
                    </div>
                </div>
                <Footer />
            </>
        )}
        </>
    )
}

export default Donor;