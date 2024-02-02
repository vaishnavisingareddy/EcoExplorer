const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is needed']

    },
    email:{
        type:String,
        required:[true,'email is needed']

    },
    password:{
        type:String,
        required:[true,'password is needed']

    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:'Blog',
        
    },],

},{timestamps:true})

const userModel=mongoose.model('User',userSchema)
module.exports=userModel;