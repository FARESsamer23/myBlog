/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Commnets({comment}) {
  
    const [User,setUser] = useState({})
    console.log(User)
    
    useEffect(()=>{
          const  getUser = async ()=>{
            try{
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json()
                if(res.ok){
                    setUser(data.user)
                   
                }
               }catch(error){
                          console.log(error)
                          
               }
    
           }
           getUser();
    },[comment])

  return (
    <div className='my-4 flex-col border-b dark:border-gray-200 py-3 w-full'>
         <div className=' flex items-center gap-2    '>
               <div className=' flex-shrink-0'>
               <img className=' w-10 h-10 rounded-full' src={User.profilePicture} alt={User.username} />

                </div>         
          <span className=' text-xs font-bold truncate' >{User ?` @${User.username} `:" anonymous user"}</span>
          <span className=' text-gray-500 text-xs  '>
            {moment(comment.createdAt).fromNow()}
          </span>
         </div>
         <div className='ml-16'>
          <p className='text-gray-500 pb-2 '>{comment.content}</p>
          </div>
    </div>
  )
}
