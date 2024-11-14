/* eslint-disable react/prop-types */
import Comments from './Commnets'
import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function CommentSection({postId}) {   
    const [comment,setComent] = useState("")
    const [comments, setComments] = useState([])
    console.log(comments)
    const [commentError,setComentError] = useState(null)
   
     const {currentUser} = useSelector(state => state.user)

     const HandelSubmit = async (e)=>{
             
                      e.preventDefault()

                  if(comment.length > 200 && postId && currentUser){
                     return    
                  }
                    try{
                     const res = await fetch('/api/comment/create',{
                        method :'Post',
                        headers:{
                         'Content-Type':'application/json' 
                        },
                        body:JSON.stringify({content :comment,postId,userId:currentUser._id})
                     });
                     const data = await res.json()
                     if(res.ok){
                        setComent('');
                        setComentError(null)
                        setComments([data,...comments])
                     }
                    }catch(error){
                               console.log(error)
                               setComentError(error.message)
                    }
    
                  }

                       


     useEffect(()=>{

      const  getComments = async()=>{
         try{
            const res = await fetch(`/api/comment/getPostComments/${postId}`);
            const data = await res.json()
            console.log(data)
            if(res.ok){
               setComments(data)
               
            }
           }catch(error){
                      console.log(error)
                      
           }

       }
       getComments();
          
     },[postId])

  return ( 
    <div className=' mx-auto pt-2 p-3 mt-5  max-w-2xl w-full text-sm'>
         { currentUser ?
           (
               <div  className='flex gap-1 my-5  items-center'>
                <span className=' text-gray-500 font-medium '>Signed in as:</span>
                <img className=' w-10 h-10 rounded-full object-cover' src={currentUser.profilePicture}  alt='userImage' />
                <Link to={'/dashboard?tab=profile'} className='text-teal-500 font-medium '>@{currentUser.email}</Link>
               
               </div>):
                    ( <div  className=' text-sm  flex gap-1 '>
                      You Must be signed to comment. 
                        <Link  className='text-teal-400 ' to={'/sign-in'}> Sign in  </Link>
                    </div>)
      }

      {
         currentUser && (
                        <form   onSubmit={HandelSubmit}
                         className=' border border-teal-400 rounded-md p-3'>

                          <Textarea
                           placeholder='Add a comment...'
                           rows='3'
                           maxLength="200"
                           onChange={(e)=>{setComent(e.target.value)}}
                            value={comment}
                           />
                          <div className=' mt-3 flex  justify-between items-center'>
                            <p>{200 - comment.length} characters reamining</p>
                            <Button  type="submit" outline gradientDuoTone='cyanToBlue'
                            > 
                               Submit
                            </Button>
 

                          </div>
                          {
                           commentError && <Alert color='failure'className='mt-5' >{commentError}</Alert>
                          }
                          </form>    
                        
         )
            

      }


      {
         comments.length === 0 ? (
            <p className=' text-gray-500 text-sm m-5 border border-teal-400 rounded-sm my-5 p-5'>
               No comments yet
               </p>):(
                  <div className=' flex items-start flex-col border border-teal-400 rounded-s m my-5 p-5'>
                     <div className='flex items-center gap-2'>
                     <p>Comments</p>
                     <div className='border border-teal-400 rounded-sm max-w-fit px-1'>
                        <p>{comments.length }</p>
                     </div>
                     </div>
                     
                      {
                        comments &&
                  comments.map((comment) =>(
                  <Comments  comment={comment} key={comment._id}/> 
                 )
               )}
               </div>)
      }
   
      </div>
  )
}
