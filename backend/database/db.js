const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
}

const createConnection = async() => {
    const connection = mysql.createConnection(config);
    
    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        });
        console.log('connection created');
        return connection;
    } catch (error) {
        console.log(error);
    }
}

module.exports = createConnection;