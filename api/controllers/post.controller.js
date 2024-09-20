import Post from '../models/post.model.js'
import bcryptjs from "bcryptjs"
import { errorHandler } from '../utils/error.js';


export const create = async (req,res,next)=>{
     if(!req.user.isAdmin){
        return next(errorHandler(403,' you are not allowed to create a post'))
     }   
     if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'title and content are required'))
     }
     const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
         
         const newPost = new Post({
            ...req.body, slug, userId: req.user.id
         })
         try{
                const savedPost =  await newPost.save();
                res.status(201).json(savedPost)

         }catch(error){
            return next(error)
         }

    }