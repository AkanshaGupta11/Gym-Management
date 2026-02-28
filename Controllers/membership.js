const Membership = require('../Models/membership')

exports.addMembership = async(req,res) => {
    try{
        const {months,price} = req.body;

        if(!months || !price){
            return res.status(400).json({
                success:false,
                message:"All field required"
            })
        }
        //if already that month exist -> jsut update price 
        // if month not present entry in db 
        let newMembership
        const membership = await Membership.findOne({gym:req.gym._id,months})
        if(membership){
            membership.price = price;
            await membership.save();
        }
        else{
            newMembership = new Membership({price , months , gym:req.gym._id})
            await newMembership.save();
        }

        res.status(200).json({
            success:true,
            message:"Membership added",
            data:newMembership
        })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


//get memberships of my gym 
exports.getMembership = async(req,res) => {
    try{
        const loggedInId = req.gym._id;

        if(!loggedInId){
            return res.status(400).json({
                success:false,
                message:"Not valid user"
            })
        }

        const memberships = await Membership.find({gym:loggedInId});
        res.status(200).json({
            message:"Membership fetched Successfully",
            membership: memberships
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}