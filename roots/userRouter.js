import express from 'express';
import { createUser,logginUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post("/",createUser);
userRouter.post("/login", logginUser);


export default userRouter;