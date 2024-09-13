import jwt from 'jsonwebtoken'
import { errorHandler } from './error'

export const verifyToken = (req,res,next)=>{
     const token = req.cookie.access_token

     if(!token){
        return  next(errorHandler(401,'Unauthorized'))
     }
     try{
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return next(errorHandler(403,'Invalid token'))
                }
                req.user = user
                next()
        })
      
     }catch(err){
        return next(errorHandler(401,'Unauthorized'))
     }


}