import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:['rejected','accepted','pending'],
        default:'pending'
    }
},{timestamps:true})

export const application=mongoose.model('application',applicationSchema);