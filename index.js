import express from 'express';
import mongoose from "mongoose";
import userRouter from './roots/userRouter.js';
import jwt from "jsonwebtoken";
import productRouter from './roots/productRouter.js';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

//Authentication middleware. middleware for token

app.use((req, res, next) => {

    
    let token = req.headers.authorization;
    

    if (token !=null) {

         token = token.replace("Bearer ", "");
         console.log(token);
         jwt.verify(token, process.env.JWT_SECRET,

            (err, decoded) => {
                
                if(decoded == null){
                    res.json({
                        message: "Invalid token, please login again"
                    })
                    return

                }
                else{
                    req.user = decoded;
                }
            }
         )
    }
    next();
})


const connectionString= process.env.MONGO_URI;


mongoose.connect(connectionString).then(
    () => { 
        console.log("Connected to MongoDB");
    }  

).catch(
    (err) => {
        console.error("Error connecting to MongoDB:");
        console.error(err);
    }
);



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


app.listen(5000, 
    () => {
    console.log("Server is running on port 5000");
    console.log("Thank you")
    }
);


