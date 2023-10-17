import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error(error);
});