import mongoose from "mongoose";

const connectDB = async () => {

   try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("MONGODB is connected.")
   }
   catch (err) {
      console.log("MONGODB error", err.message)
   }
}

export default connectDB;