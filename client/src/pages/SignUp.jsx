
import { Link } from 'react-router-dom';
import {Button, Label, TextInput} from 'flowbite-react'
export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
    <div className=' flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    {/*left side */}
    <div className="flex-1">
    <Link
    to={"/"}
    className="font-bold dark:text-white text-4xl"
  >
    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400  h-12 rounded-md
     text-white">
      Fares&apos;s Blog
    </span>
  </Link>
  <p className='text-sm mt-5'> This a demo project. You can sign up with your email and password 
  or with Google.</p>
  </div>
    {/*right side */}
    <div className="flex-1">
      <form className='flex flex-col gap-2'>
           <div>
           <Label value="Your username" />
           <TextInput type="text" placeholder="Username"  id='username' />
           </div>

           <div>
           <Label value="Your email" />
           <TextInput type="email" placeholder="name@gmail.com"  id='email' />
           </div>

           <div>
           <Label value="Your password" />
           <TextInput type="password" placeholder="password"  id='password' />
           </div>

           <Button gradientDuoTone='purpleToPink' type='submit'  >Sign Up</Button>
      </form>
      <div className='mt-5 flex gap-2 text-sm'>
        <span>Have an account?</span>
        <Link className='text-blue-500' to='/sign-in'>Sign In</Link>
      </div>
     </div>
    </div>
    </div>
  )
}
