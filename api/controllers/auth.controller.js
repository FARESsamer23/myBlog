import User from '../models/User.model.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
export const signup = async (req,res,next)=>{
   const {username , email , password} = req.body;
    if(!username || !email || !password || username ==='' || email ==='' || password ===''){
         next(errorHandler(400,'All fields are required'))
    }
    const hashedPasswored = bcryptjs.hashSync(password,10)
     const newUser = new User({
        username,
        email,
        password:hashedPasswored
     });
      try{
        await newUser.save()
        console.log("mrigla")
        res.json({message : "Sign up successful"})
    
      }catch(error){
        next(error);
      }
    }


