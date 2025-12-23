import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connecter au DB avec success !");
  } catch (error) {
    console.log("Il y a eu une erreur lors de la connection au DB " + error);
  }
};

export default connectDb;
