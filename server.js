require('dotenv').config();
const express=require('express');
const app = express();
const router=require('./router/auth-router')
const connectDB=require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const conatctRoute=require("./router/contact-router")
app.use(express.json());
app.use('/api/auth',router)
app.use('/api/form',conatctRoute)

const PORT=5000;
app.use(errorMiddleware)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})
