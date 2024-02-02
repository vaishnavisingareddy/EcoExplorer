const userModel=require('../models/userModel')
const bcrypt=require('bcrypt')
exports.registerController=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        if (!username || !email || !password){
            return res.status(400).send({
                message:"please fill all details",
                success:false,

            });
            const existingUser=await userModel.findOne({email})
            if(existingUser){
                return res.status(400).send({
                    message:"email already exists",
                    success:false,


                });
            }



        }
        const hashedpassword=await bcrypt.hash(password,10)

        const user=new userModel({username,email,password:hashedpassword})
        await user.save()
        return res.status(201).send({
            message:"successfully saved",
            success:true,
            user,

        })


    } catch(error){
        
        return res.status(500).send({
            message:"error in registering",
            success:false,
            error
        })

    }
    
};



exports.getAllUsers=async(req,res)=>{
    try{
        const users= await userModel.find({});
        return res.status(200).send({
            usercount:users.length,
            success:true,
            message:'all users are shown',
            users
        })


    } catch(error){
        
        return res.status(500).send({
            message:"error is showing all users",
            success:false,
            error
        })

    }

}


exports.loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if (!email || !password){
            return res.status(400).send({
                message:'please enter all fields',
                success:false
            })
        }
        const user= await userModel.findOne({email})
        if (!user){
            return res.status(200).send({
                message:"user doesnt exist",
                success:false
            })
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if (!ismatch){
            return res.status(400).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        return res.status(200).send({
            message:"login success",
            success:true,
            user
            
        })

    } catch(error){
        
        return res.status(500).send({
            message:"error in login",
            success:false,
            error
        })

    }
};