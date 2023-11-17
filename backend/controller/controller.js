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
    loginAdmin: async(email) => {
        try {
            const connection = await createConnection();
            const query = 'SELECT * FROM admin_table WHERE email = ?';

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
    },
    selectUsers: async() => {
        try {
            const connection = await createConnection();
            const query = 'SELECT * FROM users_table';

            const selectUser = await new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return selectUser;
        } catch(error) {
            console.error(error);
        }
    },
    deleteUser: async (userId) => {
        try {
            const connection = await createConnection();
            const query = 'DELETE FROM users_table WHERE user_id = ?';
 
            const delUser = await new Promise((resolve, reject) => {
                connection.query(query,[userId], (err, result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                       
                    }
                });
            });
            return delUser;
        } catch(error) {
            console.error(error);
        }
    },
    donorQuestions: async (userId, donorQuizes)  => {
        // console.log(userId);
        try {
            const age = donorQuizes.age;
            const weight = donorQuizes.weight;
            const frequency = donorQuizes.frequency;
            const history = donorQuizes.history;

            const connection = await createConnection();
            const query = 'INSERT INTO donor_questions (user_id, age, weight, frequency, history) VALUES (?, ?, ?, ?, ?)';
          

            const insertQuestions = await new Promise((resolve, reject) => {

                connection.query(query,[userId ,age, weight, frequency, history], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return insertQuestions;
        } catch(error) {
            console.error(error);
        }
    },
    receiverQuestions: async(userId, receiverQuizes) => {
        try {
            const allergy = receiverQuizes.allergy;
            const condition = receiverQuizes.condition;
            const purpose = receiverQuizes.purpose;
            const requirements = receiverQuizes.requirements;

            const connection = await createConnection();
            const query = 'INSERT INTO receiver_questions (user_id, allergy, condition_user, purpose, requirements) VALUES (?,?,?,?,?)';

            const insertQuestions = await new Promise((resolve, reject) => {
                connection.query(query,[userId, allergy,condition, purpose, requirements], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            return insertQuestions;

        } catch (error) {
            console.error(error);
        }
    },
    selectQuestionsId: async(loginId) => {
        const connection = await createConnection();
        try {
            const queryOne = 'SELECT * FROM donor_questions WHERE user_id = ?';
            const queryTwo = 'SELECT * FROM receiver_questions WHERE user_id = ?';

            const [questionsOne, questionsTwo] = await Promise.all([
                new Promise((resolve, reject) => {
                  connection.query(queryOne, [loginId], (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                }),
                new Promise((resolve, reject) => {
                  connection.query(queryTwo, [loginId], (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                }),
              ]);
          
              console.log(questionsOne, questionsTwo);
              return { questionsOne, questionsTwo };
    
            
            // console.log(questionsOne, questionsTwo );
            // return { questionsOne, questionsTwo };
        } catch (error) {
            console.error(error);
        }
    },
    selectDonorQuestions: async () => {
        try {
            const query = 'SELECT * FROM donor_questions';
            const connection = await createConnection();

            const selectQuestions = await new Promise((resolve, reject) => {
                connection.query(query, (err, results) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(results);
                    }
                });
            });
            return selectQuestions;
        } catch (error) {
            console.log(error);
        }
    },
    selectReceiverQuestions: async () => {
        try {
            const query = 'SELECT * FROM receiver_questions';
            const connection = await createConnection();

            const selectQuestions = await new Promise((resolve, reject) => {
                connection.query(query, (err, results) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(results);
                    }
                });
            });
            return selectQuestions;
        } catch (error) {
            console.log(error);
        }
    },
    deleteDonorQuestion: async (userId) => {
        try {
            const connection = await createConnection();
            const query = 'DELETE FROM donor_questions WHERE user_id = ?';
 
            const delUser = await new Promise((resolve, reject) => {
                connection.query(query,[userId], (err, result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                       
                    }
                });
            });
            return delUser;
        } catch(error) {
            console.error(error);
        }
    },
    deleteReceiverQuestion: async (userId) => {
        try {
            const connection = await createConnection();
            const query = 'DELETE FROM receiver_questions WHERE user_id = ?';
 
            const delUser = await new Promise((resolve, reject) => {
                connection.query(query,[userId], (err, result) => {
                    if(err) {
                        reject(err);
                    }else{
                        resolve(result);
                       
                    }
                });
            });
            return delUser;
        } catch(error) {
            console.error(error);
        }
    },
}

module.exports = controller;