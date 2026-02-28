const Member = require('../Models/member');
const Membership = require("../Models/membership")



function addMonthsToDate(months,joiningDate){

    //get current year , month and day 
    let today = joiningDate;
    const currYear = today.getFullYear();
    const currMonth = today.getMonth();
    const currDay = today.getDate();

    //cal new month and yea r
    const futureMonth = currMonth + months;
    const futureYear = currYear + Math.floor(futureMonth/12);

    //calculate correct future minth 
    const adjustedMonth = futureMonth % 12;

    //set the date to first of the future month 
    const futureDate = new Date(futureYear , adjustedMonth , 1);

    //get the last day of the future month 
    const lastDayOfFutureMonth = new Date(futureYear , adjustedMonth + 1, 0).getDate();

    //adjust the day if curr day exceeds the number of days in the new month 
    const adjustedDay = Math.min(currDay,lastDayOfFutureMonth);

    //set the final adjusted day 
    futureDate.setDate(adjustedDay)

    return futureDate;
}
exports.registerMember = async(req,res) => {
    try{
        const{name , mobileNo, address,membership,profilePic,joiningDate} = req.body;
        
        if(!name || !mobileNo || !address || !membership || !profilePic || !joiningDate){
            return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
        }

        const member = await Member.findOne({gym:req.gym._id,mobileNo})
        if(member){
            return res.status(200).json({
            success:true,
            message:"Member already registered"
        }) 
        }

        const memberShip = await Membership.findOne({_id:membership, gym:req.gym._id})
        const membershipMonth = memberShip.months;

        if(membership){
            let joinDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth,joinDate)

            let newMember = new Member({name , mobileNo , address , membership ,gym:req.gym._id , profilePic ,nextBillDate})
            await newMember.save();
            return res.status(200).json({
                success:true,
                message:"new member added successfully",newMember
            })
        }
        else{
            return res.status(400).json({
                error:"No membership there"
            })
        }

    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getAllMember = async(req,res) =>{
    try{
        //ek baar mai kitna data laa rhe , and kitna data skip kr rhe 
        //limit = 9 --> hr baar 9 bhejea 
        // skip -> 2 --> 9 data hi dega but will skip 2 from above 
        //post method -> body m bhejte the 
        //get metho --> query m bhejenge 

        const {skip,limit} = req.query;
        const members = await Member.find({gym: req.gym._id});
        const totalMember = members.length;

        //currently joined first 
        const limitMembers = await Member.find({gym:req.gym._id}).sort({createdAt : -1}).skip(skip).limit(limit);

        res.status(200).json({
            message:members.length?"Fetched Members SuccessFully":"No any Member Registered yet",
            members:limitMembers,
            totalMembers: totalMember
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.searchMember = async(req,res) => {
    try{
        const {searchTerm} = req.query;
        const member = await Member.find({gym:req.gym._id,
            $or : [{name : {$regex: "^" + searchTerm , $options : "i"}},
                {mobileNo :{$regex :'^' + searchTerm, $options:'i'}}
            ]
        })
        return res.status(200).json({
           success:true,
           message:member.length ? "Fetched Members Successfully" : "No Such Member Registered yet",
           totalMembers : member.length,
           members:member
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.monthlyMember = async(req,res) => {
    try{
        const now = new Date();
        console.log(now);
        //get first day  of currentMont 
        const startofMonth = new Date(now.getFullYear() , now.getMonth() , 1 );

        const endOfMonth = new Date(now.getFullYear() , now.getMonth() + 1,0,23,59,59,999);

        const member = await Member.find({gym : req.gym._id,
            createdAt:{
                $gte: startofMonth,
                $lte : endOfMonth
            }

        }).sort({createdAt:-1})
        console.log("member",member);

        return res.status(200).json({
            success:true,
            message:"Monthly members fetched successfully",
            members:member
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.expiringWithin3Days = async(req,res) => {
    try{
        const today = new Date();
        const nextThreeDays = new Date();

        nextThreeDays.setDate(today.getDate() + 3)

        const member = await Member.find({gym:req.gym._id,
            nextBillDate:{
                $gte : today,
                $lte:nextThreeDays
            }
        })

        
        return res.status(200).json({
            message:member.length ? "Fetched Members Successfully":"No such Member expiring",
            members:member,
            totalMembers:member.length
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.expiringWithin4to7Days = async(req,res) => {
    try{
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate()+4);

        const next7Days = new Date();
        next7Days.setDate(today.getDate()+7);

        const member = await Member.find({gym:req.gym._id,
            nextBillDate:{
                $gte : next4Days,
                $lte:next7Days
            }
        })

        return res.status(200).json({
            message : member.length ? "Fetched Members successfully":"No such member is expirin in 4-7 days",
            members:member,
            totalMembers : member.length
        })

    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.expiredMember = async(req,res) => {
    try{
        const today = new Date();
        //uska nxt bill date less tha today 
        // gym chod k chla gya 
        const member = await Member.find({gym:req.gym._id,status:"Active",
            nextBillDate:{
                $lt:today
            }
        })
        return res.status(200).json({
            message : member.length ? "Fetched Members successfully":"No such member has expired",
            members:member,
            totalMembers : member.length
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.inactiveMember = async(req,res) => {
    try{
        const member = await Member.find({gym:req.gym._id , status:"Pending"});
        return res.status(200).json({
            message : member.length ? "Fetched Members successfully":"No such member is Pending",
            members:member,
            totalMembers : member.length
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getMemberDetail = async(req,res) => {
    try{
        const {id} = req.params;
        const member = await Member.findOne({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                success:false,
                message:"No such member"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Member data Fetches",
            member:member
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.changeStatus = async(req,res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;

        const member = await Member.findOne({
            _id:id,gym:req.gym._id
        })

        if(!member){
            return res.status(400).json({
                success:false,
                message:"member not found"
            })
        }

        member.status = status;
        await member.save();

        return res.status(200).json({
            success:true,
            message:"status changed successfully",
            
        })

    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


exports.updateMemberPlan = async(req,res) => {
    try{
        const {id} = req.params;
        const {membership} = req.body;

        const memberShip = await Membership.findOne({gym:req.gym._id,_id:membership})
        if(!membership){
            return res.status(400).json({
            success:false,
            message:"No such membership plan"
        })
        }

        let getMonth = memberShip.months;
        let today = new Date();
        let nextBillDate = addMonthsToDate(getMonth , today);

        const member = await Member.findOne({gym:req.gym._id , _id:id})

        if(!member){
            return res.status(400).json({
            success:false,
            message:"No such membership plan"
        })
        }

        member.nextBillDate = nextBillDate
        member.lastPayment = today;

        await member.save();

        return res.status(200).json({
            success:true,
            message:"Membership updated successfully"
        })

    }

    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}