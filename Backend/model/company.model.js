import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
        
    },
    website:{
        type:String
       
    },
    location:{
        type:String
        
    },
    logo:
    {
        type:String
    },
    userid:{
        type:String,
        ref:'user',
        required:true
    }
},{timestamps:true}) 

export const company=mongoose.model('company',companySchema);