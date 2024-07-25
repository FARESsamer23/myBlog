import  express from 'express'
import mongoose from 'mongoose'
import  dotenv  from 'dotenv'
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
 
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>{
     console.log(` Server listening on port ${port}!`)
})