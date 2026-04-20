import mongoose from "mongoose";

const dbconnect =async()=>
{
    try {
       await mongoose.connect(process.env.url)
       console.log('mongodb connected successfully');
       
    } catch (error) {
        console.log(error)
    }
}
export default dbconnect;