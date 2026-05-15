import express from 'express';
import mongoose from "mongoose";
import userRouter from './roots/userRouter.js';
import jwt from "jsonwebtoken";
import productRouter from './roots/productRouter.js';

const app = express();

app.use(express.json())

//Authentication middleware. middleware for token

app.use((req, res, next) => {
    let token = req.headers.authorization;

    if (token !=null) {

         token = token.replace("Bearer ", "");
         console.log(token);
         jwt.verify(token, "jwt-secret",

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


const connectionString= "mongodb+srv://admin:123@cluster0.16ooybq.mongodb.net/?appName=Cluster0"


mongoose.connect(connectionString).then(
    () => { 
        console.log("Connected to MongoDB");
    }  

).catch(
    () => {
        console.error("Error connecting to MongoDB:");
    }
);

app.use("/users", userRouter);
app.use("/products", productRouter);


app.listen(5000, 
    () => {
    console.log("Server is running on port 5000");
    console.log("Thank you")
    }
);

