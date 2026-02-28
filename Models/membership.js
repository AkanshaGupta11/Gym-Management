const mongoose = require("mongoose")

const membershipSchema = new mongoose.Schema({
    months:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    gym :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true,
    }
},{timestamps:true})

const modelMembership = mongoose.model("membership",membershipSchema)
module.exports = modelMembership