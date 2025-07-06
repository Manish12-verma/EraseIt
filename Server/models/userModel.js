import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    photo:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    creditBalance:{type:Number,default:4},
})

const userModel = mongoose.model.user || mongoose.model("user",userSchema);

export default userModel;