import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'


 const  ScrolToTop = ()=>{
      const {pathname} = useLocation()
      useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior: "smooth",
          });
 },[pathname])

  return null;

}


 export default ScrolToTop 
