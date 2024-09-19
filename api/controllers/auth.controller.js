import User from '../models/User.model.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';
 import jwt from 'jsonwebtoken'



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
        res.json({message : "Sign up successful"})
    
      }catch(error){
        next(error);
      }
    }


    export const signin = async (req,res,next)=>{
      // check the output from user
      const {email  , password} = req.body;
    if(!email || !password || email ==='' || password ===''){
         next(errorHandler(400,'All fields are required'))
    } 
        try{
          const valideUser = await User.findOne({email})
            if(!valideUser){
             return next(errorHandler(404,'User not found'))
            }
            const validPassword = bcryptjs.compareSync(password,valideUser.password)
            if(!validPassword){
             return next(errorHandler(401,'Invalid password'))
            }
            const token = jwt.sign( {id:valideUser._id ,isAdmin: valideUser.isAdmin}, process.env.SECRET_KEY,);
           const {password: pass, ...rest}= valideUser._doc
          
            res.status(200).cookie('access_token',token,{httpOnly:true})
            .json(rest)
          }catch(error){
          next(error)
        }
    }


    export const google = async (req,res,next)=>{
      const {name,email,googlePhotoUrl} = req.body
      
       
      console.log("rahi mrigla")

      try{
        const user = await User.findOne({email})

        if(user){
          const token = jwt.sign( {id:user._id}, process.env.SECRET_KEY,);
          const {password: pass, ...rest}= user._doc;
          

          res.status(200).cookie('access_token',token,{httpOnly:true})
          .json(rest)
        }else{
           const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
          const hashedPasswored = bcryptjs.hashSync(generatedPassword,10)
          const newUser = new User({
             username:name,
             email,
             password:hashedPasswored,
             profilePicture:googlePhotoUrl
          });   
          await newUser.save()
          const token = jwt.sign( {id:newUser._id, isAdmin: valideUser.isAdmin}, process.env.SECRET_KEY,);
          const {password, ...rest}= newUser._doc
        
         
           res.status(200).cookie('access_token',token,{httpOnly:true})
           .json(rest)
        }
      }catch(error){

      }

    }
