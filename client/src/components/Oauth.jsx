import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import {signInSuccess,signInStart,signInFailure} from '../redux/User/userSlice'
import { useNavigate } from 'react-router-dom'
export default function Oauth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async ()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try{
            dispatch(signInStart())
              const resultFromGoogle = await signInWithPopup(auth,provider)
               const  res =  await fetch('/api/auth/google',{
                  method:'POST',
                  headers: {
                    'Content-Type': 'application/json',  
                },

            body:JSON.stringify({
                name:resultFromGoogle.user.displayName,
                email:resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoURL,
            })})
            console.log("mrigla hna");
            const data = await res.json()

            console.log(data);
            if(res.ok){
                console.log(data);
                dispatch(signInSuccess(data))
                navigate('/')
            }
           

        }catch(error){
            console.log(error)
            dispatch(signInFailure(error.message))
        }
                                 }
  return (
    <Button type='button' gradientDuoTone="pinkToOrange" outline 
    onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
   <span>Continue withe Google</span> 
     </Button>
  )
}
