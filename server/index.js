const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')  //use this
const dotenv = require('dotenv');
const app = express()

mongoose.connect('mongodb://localhost:27017/reminder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`successfully connected`);
}).catch((e) => {
    console.log(`not connected`);
})

const userRoute = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")

dotenv.config();
app.use(express.json());
app.use(cors()) 
app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
app.listen(3001, ()=>{
    console.log("server runing on port 3001")
})
