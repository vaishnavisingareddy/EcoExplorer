const mongoose=require('mongoose')

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to data base")

    } catch(error){
        console.log(`connection error ${error}`)
    }
};
module.exports=connectDB;