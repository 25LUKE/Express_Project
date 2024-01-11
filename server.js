const express = require('express');
const errorHandler = require('./middleware/ErrorHandler');
const connectdb = require('./config/connectDB');
const dotenv = require("dotenv").config();
const app = express();

connectdb()

//whenever we want to accept or pass some data from the client to a server 
//we need this middleware
app.use(express.json());
app.use('/api/manager', require('./route/contactRoutes'))
app.use('/api/user', require('./route/userRoutes'))
app.use(errorHandler)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
