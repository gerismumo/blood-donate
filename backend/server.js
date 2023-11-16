const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './database/.env'});
const session = require('express-session')
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes');
app.use('/api', routes);

const MemoryStore = require('memorystore')(session);
const store = new MemoryStore({
  checkPeriod: 86400000, // prune expired entries every 24h (in ms)
});

app.use(
    session({
      secret: 'your-secret-key', 
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: { secure: false }, 
    })
  );

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