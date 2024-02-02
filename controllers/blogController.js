const mongoose  = require('mongoose')


const blogModel= require('../models/blogModel')
const userModel = require('../models/userModel')

exports.getBlogsController=async(req,res)=>{
    try{
        const blogs= await blogModel.find({}).populate('user')
        if(!blogs){
            return res.status(200).send({
              
                message:"No Blogs data",
                success:false,
               
            })
        }
        return res.status(200).send({
            message:'blogs data is here',
            success:true,
            blogCount:blogs.length,
            blogs
        })

    } catch(error){
        console.log("Error in getting all blogs")
         return res.status(500).send({
            message:"Couldnt get all blogs",
            success:false,
            error:error.message
        })

    }


}

exports.createBlogController=async(req,res)=>{
    try{
        const {title,description,image,user}=req.body
        if (!title || ! description || !image ||!user){
            return res.status(400).send({
                message:'please enter all details',
                success:true
                
            })
        }
        const existingUser=await userModel.findById(user)
        if (!existingUser){
            return res.status(404).send({
                message:'no user with that id',
                success:false
            })
        }
        const newblog= new blogModel({title,description,image,user})
        const session=await mongoose.startSession()
        session.startTransaction()
        await newblog.save({session})
        existingUser.blogs.push(newblog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newblog.save()
        return res.status(200).send({
            message:"successfully created blog",
            success:true,
            newblog
        })
    } catch(error){
        
        return res.status(500).send({
            message:"error in blog creation",
            success:false,
            error
        })


    }

}

exports.updateBlogController=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,description,image}=req.body
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            message:"successfully updated",
            success:true,
            blog

        })
    } catch(error){
        console.log("error in updating")
        return res.status(400).send({
            message:"error updating blog",
            success:false,
            error
        })
    }


}
exports.getBlogByIdController=async(req,res)=>{
    try{
        const {id}=req.params
        const blog=await blogModel.findById(id)
        if (!blog){
            return res.status(500).send({
                message:"not found",
                success:false
            })
        }
        return res.status(200).send({
            message:"the blog",
            success:true,
            blog
        })




    } catch(error){
      
        return res.status(500).send({
            message:'error in getting 1 blog',
            success:false,
            error
        })
    }

}

exports.deleteBlogController=async(req,res)=>{
    try{
        const blog=await blogModel.findByIdAndDelete(req.params.id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            message:"successfully deleted",
            success:true
        })


    } catch(error){
       
        return res.status(500).send({
            message:"failed to delete",
            success:false,
            error
        })
    }

}

exports.userBlogController=async(req,res)=>{
    try{
        const userBlog=await userModel.findById(req.params.id).populate('blogs')
        if(!userBlog){
            return res.status(400).send({
                message:"no blogs of that user to show",
                success:false
            })
        }
        return res.status(200).send({
            message:"user blogs",
            success:true,
            userBlog
        })



    } catch(error){
      
        return res.status(500).send({
            message:"Error in showing user blogs",
            success:false,
            error
        })
    }


}