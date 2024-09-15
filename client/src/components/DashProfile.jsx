import { Alert, Avatar, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UpdateFailure,UpdateStart,UpdateSuccess } from '../redux/User/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePeckerRef = useRef()
    const [imageFileUplaodinProgress,setImageFileUplaodinProgress] = useState(0)
    const [imageFileUploading,setimageFileUploading]= useState(false);
    const dispatch = useDispatch()
    const [imageFileUplaodinError,setImageFileUplaodinError] = useState(null)
    const [upadteUserSuccess,setupadteUserSuccess] = useState(null)
    const [upadteUserError,setupadteUserError] = useState(null)
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };

   const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
   }


   
   useEffect(()=>{

       if(imageFile){
          uploadImage();
        }
   },[imageFile]);

   const uploadImage = async () =>{

    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write : if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
          
    //     }
    //   }
    setimageFileUploading(true)
     const storage  = getStorage(app);
     const fileName = new Date().getTime() + imageFile.name;
     const storageRef = ref(storage,fileName);
     const uploadTask = uploadBytesResumable(storageRef,imageFile);
     uploadTask.on('state_changed',
        (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUplaodinProgress(progress.toFixed(0))
     },(error)=>{
      setImageFileUplaodinError('Could not upload image (file must be less than 2MB )')
      setimageFileUploading(false)
    },
     ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              setImageFileUrl(downloadURL)
              setFormData({ ...formData,profilePicture:downloadURL})
              setimageFileUploading(false)
            }
          )
     }
    );
  }


    const {currentUser} = useSelector(state => state.user)
    

    const handelSubmit = async (e)=>{
      e.preventDefault()
      setupadteUserError(null)
      setupadteUserSuccess(null)
       if(Object.keys(formData).length === 0){
        setupadteUserError('no change made')
        return;

       }
       if(imageFileUploading){
        return;
       }
       try{
               dispatch(UpdateStart());
               const res = await fetch(`/api/user/update/${currentUser._id}`,
                        {
                          method: 'PUT',
                          headers:{
                            'Content-Type': 'application/json',
                        },body:JSON.stringify(formData)
                      }
                      );

                      const data = await res.json()
                      console.log('Response Status:', res.status);
                      console.log('Response Body:', data);

                      if(!res.ok){
                        dispatch(UpdateFailure(data.message))
                        setupadteUserError(data.message)
                      }
                      else{
                        dispatch(UpdateSuccess(data))
                        setupadteUserSuccess("User's Profile updated successfuly")
                        }
               
        }
       catch(error){
        dispatch(UpdateFailure(error.message))
        setupadteUserError(error.message);
       }

    }

  return (

    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className=' my-7 text-3xl font-semibold w-full text-center'>Profile</h1>
        
       <form className='flex flex-col gap-4 'onSubmit={handelSubmit}>

              <input hidden type='file' accept='image/*' onChange={handleImageChange} ref={filePeckerRef}/>
           
              <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden' 
                onClick={()=>{filePeckerRef.current.click()}}>  

                 
                <img src={imageFileUrl || currentUser.profilePicture}  alt='user' 
                 className='rounded-full w-full h-full object-cover
                  border-8 border-[lightgray]'/>
                  { imageFileUplaodinProgress && (
                    <CircularProgressbar value={imageFileUplaodinProgress ||0} 
                    text={`${imageFileUplaodinProgress}%`} 
                    strokeWidth={5}
                    styles={{
                      root: { 
                         height:'100%',
                        width:'100%',
                        position:'absolute',
                        top:0,
                         left:0,      
                        },
                        path:{
                          stroke:`rgba(62,152,199,${imageFileUplaodinProgress / 100})`
                        }
                    }}
                    />)
                  }
              </div>
              {
                imageFileUplaodinError &&
                <Alert color="Failure">
                {imageFileUplaodinError}
                </Alert>
              }
              
         
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
           >
           Update</Button>
         </form>

         <div className='text-red-500 my-5 cursor-pointer font-semibold
          flex justify-between'>
           <span>Delete Account</span>
           <span>Sign out</span>
         </div>
          { upadteUserSuccess && (
            <Alert color='success' severity="success" className='mt-5'>
            User updated successfully
            </Alert>
          )}
          { upadteUserError && (
            <Alert color='failure' severity="failure" className='mt-5'>
            {upadteUserError}
            </Alert>
          )}

       </div>
  )
}
