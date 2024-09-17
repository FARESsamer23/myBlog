import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {signoutSuccess } from '../redux/User/userSlice';

export default function DashSideBar() {

  const location = useLocation();
  const [tab,setTab] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
  
         if(tabFromUrl){
           setTab(tabFromUrl)
         }

  },[location])

  
 const hanedleSignout = async ()=>{
  try{
    const res = await fetch(`/api/user/signout`, {
      method: 'POST'});
      const data = res.json();
      if(!res.ok){
         console.log(data.message)
        }
        else{
          dispatch(signoutSuccess())
        }

  }catch(error){
      console.log(error.message)
      
  }
}
  return (

    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item as="div" active={tab ==='profile'} icon={HiUser}  label={'User'} labelColor="dark"  className="cursor-pointer">
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item  icon={HiArrowSmRight}  className="cursor-pointer"  onClick={hanedleSignout} >
          Sign Out
       </Sidebar.Item>
         
        
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
