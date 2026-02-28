import axios from 'axios';

const getMonthlyJoined = async () => {
    try{
        const response = await axios.get('http://localhost:4000/members/monthly-member',{withCredentials:true});
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export {getMonthlyJoined}

const threeDayExpire = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/within-3-days-expiring',{withCredentials:true});
        console.log(response)
        return response.data
    }
    catch(error){
        console.log("Error fetching data" , error);
        throw error;
    }
}

export {threeDayExpire}

const fourToSevenDayExpire = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/within-4-7-days-expiring',{withCredentials:true});
        console.log(response)
        return response.data
    }
    catch(error){
        console.log("Error fetching data" , error);
        throw error;
    }
}
export {fourToSevenDayExpire}

const expiredMembers = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/expired-member',{withCredentials:true});
        console.log(response)
        return response.data
    }
    catch(error){
        console.log("Error fetching data" , error);
        throw error;
    }
}
export {expiredMembers}

const inActiveMembers = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/inactive-member',{withCredentials:true});
        console.log(response)
        return response.data
    }
    catch(error){
        console.log("Error fetching data" , error);
        throw error;
    }
}
export {inActiveMembers}