import { Avatar, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
export default function DashProfile() {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className=' my-7 text-3xl font-semibold w-full text-center'>Profile</h1>
        
       <form className='flex flex-col gap-4 '>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden'>         
             <img src={currentUser.profilePicture}  alt='user' 
             className='rounded-full w-full h-full object-cover
             border-8 border-[lightgray]'/></div>
         
             <div>
             <Label value="Your name" />
             <TextInput
               type="text"
               placeholder='username'
               id="username"
               defaultValue={currentUser.username}
               onChange={handleChange}
             />
           </div>

           <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div>
            <Label value="Your password" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
           <Button
             gradientDuoTone="purpleToBlue"
             type="submit"
             outline
           >Update</Button>
         </form>

         <div className='text-red-500 my-5 cursor-pointer font-semibold
          flex justify-between'>
           <span>Delete Account</span>
           <span>Sign out</span>
         </div>
       </div>
  )
}
