const Gym = require('../Models/gym')
const bcrypt = require('bcryptjs')
const otpGenerator = require('otp-generator')
const OTP = require('../Models/otp')
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")

require('dotenv').config()



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.SENDER_EMAIL,
        pass: process.env.MAIL_PASS
    }

}) ;


exports.register = async(req,res) => {
    try{
        const {
            userName , password , gymName , profilePic , email
        } = req.body;

        if(!userName || !password || !gymName || !profilePic || !email){
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        //check user already exist 
        const userExist = await Gym.findOne({userName});
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }
        else{

            const hashPass = await bcrypt.hash(password,10);
            const newGym = new Gym({userName , password : hashPass, gymName , profilePic , email});

            await newGym.save();

            return res.status(200).json({
                success:true,
                message:"User Registered successfully",
                data : newGym
            })
        }
    }
    catch(err){
        res.status(500).json({
            error:"Server error",
            message:err.message
        })
    }
}

const cookieOptions = {
    httpOnly: true,
    secure:false,
    sameSite:'Lax'
}
exports.login = async(req,res) => {
    try{
        const {userName , password} = req.body;
        console.log("username",userName)

        if(!userName || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //if username and password present h --> generate token and store it in cookie 

        const userExist = await Gym.findOne({userName});
        if(!userExist){
            return res.status(400).json({
                success:false,
                message :"User is not registered"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password , userExist.password);
        if(isPasswordMatch){  
            //token generated
            const token = jwt.sign({gym_id:userExist._id},process.env.JWT_SecretKey);
            console.log("jwtToken",token);

            //save token in cookie
            res.cookie("cookie_token",token, cookieOptions);


            return res.status(200).json({
            success:true,
            message:"Logged In successfully",
            data:userExist,
            token
        })
        }
        else {
    
        return res.status(401).json({
        success: false,
        message: "Invalid password"
        });
    }

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            
            
        })
    }
}

exports.sendOtp = async(req,res) => {
    try{
        const {email} = req.body;

        const gym = await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({
                success:false,
                message:"Gym does not exist"
            })
        }
        
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars :false
        })
        gym.resetPasswordToken = otp;
        gym.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);

        await gym.save();

        const mailOptions = {
            from : "akanshadummy@gmail.com",
            to:email,
            subject:"Password Reset",
            text:`You requested a Password Reset Your Otp is :${otp}`
        }

        transporter.sendMail(mailOptions,(error,info) => {
            if(error){
                return res.status(500).json({
                    success:false,
                    message:error
                })
            }
            else{
                return res.status(200).json({
                    success:true,
                    message:"OTP sent successfully"
                })
            }
        })
        
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}


exports.checkOtp = async(req,res) => {
    try{
        const{email , otp} = req.body;

        const userExist = await Gym.findOne({email});
        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        if(otp !== userExist.resetPasswordToken){
            return res.status(400).json({
                success:false,
                message:"invalid otp "
            })
        }

        if(Date.now() > userExist.resetPasswordExpires){
            return res.status(400).json({
                success:false,
                message:"otp expired"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Valid otp"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.resetPassword = async(req,res) => {
    try{
        const {email,newPassword} = req.body;

        const gym = await Gym.findOne({email});

        if(!gym){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const hashPass = await bcrypt.hash(newPassword,10);

        gym.password = hashPass;
        gym.resetPasswordExpires = undefined;
        gym.resetPassword = undefined;

        await gym.save();

        res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.logout = async(req,res) => {
    try{
        //cookie mai jitna data usko delete 
        res.clearCookie('cookie_token',cookieOptions).json({
            message:'Loggesd Out successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}