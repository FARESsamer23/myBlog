import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='mt-6 flex border-2 rounded  rounded-tl-full  flex-col rounded-br-full bg-teal-400 p-3 border-teal-400  sm:flex-row justify-between items-center  mx-auto w-full'>
    <div className=' w-1/2 sm:w-full  border-2 rounded  rounded-tl-full  rounded-br-full bg-teal-200 p-3 border-teal-400'>
    <h2 className=' font-semibold text-2xl '> Want to learn more aboute Next js?</h2>
    <p className='text-xl text-gray-500'> Chekout this resources with  Next js projects</p>
       <Button  color={"teal"}  className='mt-4 rounded-tl-2xl  rounded-br-2xl  '  > 
       <a href="https://github.com/topics/nextjs-project" target='_blank' rel='noopner noreferrer'>Learn More</a>
       </Button>
    </div>
    <div className='p-7'> 
             <img  className='rounded-lg' src='https://teleporthq.io/blog/content/images/2022/04/what-is-next.js.png'  alt='image' />
    </div>

    </div>
  )
}
