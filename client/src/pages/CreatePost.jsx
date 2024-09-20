import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
  const [value, setValue] = useState('');
 

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    
    <h1 className='text-center  text-3xl my-7 font-semibold'> Create a Post</h1>
      <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput 
              type='text'
              placeholder='Title'
              required 
              id='title'
              className='flex-1'   
        />
          <Select>
          <option value="uncategorized">Select a category</option>
          <option value="javascript">Java Script</option>
          <option value="reactjs">React.js</option>
          <option value="nodejs">Node.js</option>
          <option value="nextjs">Next.js</option>
      </Select>
      </div>
      <div  className='flex gap-4 items-center justify-between border-4 border-teal-500 
      border-dotted p-3 '>
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Uplaod image</Button>
      </div>
      <ReactQuill className='min-h-[300px] h-52 mb-12 ' theme="snow" value={value} onChange={setValue} placeholder='Write somthig...'  required/>
         <Button  type='submit' gradientDuoTone={'purpleToBlue'} >Publish</Button>
      </form>
    </div>
  )
}
