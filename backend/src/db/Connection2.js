import mongoose from "mongoose"

const connectToMongoDB= async ()=>{
    try{
        await mongoose.connect("mongodb+srv://adityagotnochill:ddrrdrdD7@cluster0.fxaupan.mongodb.net/");
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log("Eroor while connecting to MongoDB", error.message)
    }
}
export default connectToMongoDB
   