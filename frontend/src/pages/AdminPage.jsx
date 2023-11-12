import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage(){
    const navigate = useNavigate();
    const[usersList, setUsersList] = useState([]);

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
        }
    }
   
    useEffect(() => {
        usersData();
    },[]);
    const filteredList = usersList.filter(user => user.blood_type  !== null && user.user_type !== null);
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

    return (
        <div className="admin-page">
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
            <div className="admin-page-content">
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
                            {filteredList.map(user => (
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
    )
}

export default AdminPage;