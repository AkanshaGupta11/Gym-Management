const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

require('dotenv').config()

const PORT = process.env.PORT || 5000;
require('./DBConn/conn');

app.use(cors({
    origin :['http://localhost:3000','https://gym-management-snowy-six.vercel.app/'],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership')
const MemberRoutes = require('./Routes/member')

app.use('/auth',GymRoutes);
app.use('/plans',MembershipRoutes);
app.use('/members',MemberRoutes)

app.get('/' , (req,res) => {
    res.send({"message":"congrats successfully"})
})

app.listen(PORT,() => {
    console.log("server running on 4000")
})