import  express from 'express'
import mongoose from 'mongoose'
import  dotenv  from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

// Set up default mongoose connection
 dotenv.config()
// Connexion à MongoDB
 mongoose
 .connect(process.env.MONGO)
 .then(()=>{
   console.log('Connexion à MongoDB réussie !')
 })
 .catch((err)=>{
     console.log('Connexion à MongoDB échouée !')
     console.log(err)
 })
  
 





const app = express()
const port = 3000
  
app.use(express.json())

app.listen(port, () =>{
     console.log(` Server listening on port ${port}!`)
})

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{

  const statusCode = err.statusCode || 500 ;
  const message  = err.message || 'Internal Server Error';
       res.status(statusCode).json({
        success:false,
        statusCode,
        message
       })
})