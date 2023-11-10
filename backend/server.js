const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './database/.env'});

app.use(cors());
app.use(express.json());


const port = process.env.PORT;
console.log(port);

const createConnection = require('./database/db');

const startServer = async () => {
    const connect = await createConnection();
    if(connect) {
        app.listen(port, () => {
            console.log(`Starting server on port ${port}`);
        });
    }
    return; 
}

startServer();