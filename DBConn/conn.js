const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/gym_Backend')
.then(() => console.log('DB connection Succesful'))
.catch((err) =>{
    console.log("err",err)
})