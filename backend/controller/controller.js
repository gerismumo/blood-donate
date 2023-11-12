const createConnection = require('../database/db');


const controller = {
    registerUser: async (registerUser) => {
       
        try {
            const connection = await createConnection();
               const fistName = registerUser.firstName;
               const lastName = registerUser.lastName;
                const email = registerUser.email;
                const phoneNumber =registerUser.phoneNumber;
                const gender = registerUser.gender;
                const county = registerUser.county;
                const password = registerUser.password;
                     
            // console.log(values);
            const query = 'INSERT INTO users_table (first_name, last_name, user_email, user_phone, user_gender, user_county, password) VALUES(?,?,?,?,?,?,?)';

            const insertUser = await new Promise((resolve, reject) => {
                connection.query(query, [fistName, lastName, email,phoneNumber, gender, county, password], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return insertUser;
        } catch(error) {
            console.error(error);
        }
    },
    loginUser: async(email) => {
        try {
            const connection = await createConnection();
            const query = 'SELECT * FROM users_table WHERE user_email = ?';

            const loginUser = await new Promise((resolve, reject) => {
                connection.query(query, [email], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return loginUser;
        } catch(error) {
            console.error(error);
        }
    },
    updateLogin: async (loginAs,bloodType, loginEmail) => {
        try {
            const connection = await createConnection();
            const query = 'UPDATE users_table SET user_type = ?, blood_type = ? WHERE user_email = ?';
            const updateLogin = await new Promise((resolve, reject) => {
                connection.query(query,[loginAs,bloodType, loginEmail], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return updateLogin;
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = controller;