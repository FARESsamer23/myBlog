import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';

export default function Dashboard() {
   const location = useLocation();
   const [tab,setTab] = useState('')

   useEffect(()=>{
     const urlParams = new URLSearchParams(location.search);
     const tabFromUrl = urlParams.get('tab');
   
          if(tabFromUrl){
            setTab(tabFromUrl)
          }

   },[location.search])
  return (
    <div className='min-h-screen flex  flex-col md:flex-row'>
     {/*SideBar */}
      <div className='md:w-56'>
          <DashSideBar/>
      </div>
      {/*Profile... */}
      <div className='w-full'>
        {tab === 'profile' && <DashProfile/> }
        {tab === 'posts' && <DashPosts/> }
        {tab === 'users' && <DashUsers/> }
      </div>
    
    </div>
  )
}
