const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './database/.env'});
const session = require('express-session');

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

app.use(session({
    secret: 'yourSecret',
    resave: false,
    saveUninitialized: true,
  }));

const port = process.env.PORT;


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