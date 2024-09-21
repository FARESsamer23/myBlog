import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";

import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ReactQuill from "react-quill";
import { app } from "../firebase";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useNavigate } from 'react-router-dom';
export default function CreatePost() {

  const [file, setFile] = useState(null);
  const [imageFileUplaodinProgress, setImageFileUplaodinProgress] = useState(0);
  const [imageFileUplaodinError, setImageFileUplaodinError] = useState(null);
  const [formData, setFormData] = useState({});
  const [pulishError, setpulishError] = useState(null);
  const [pulishSuccess, setpulishSuccess] = useState(null);

const navigate = useNavigate()
  console.log(formData)
  const handelUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUplaodinError(" please uplaod an image");
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUplaodinProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUplaodinError("Image uplaod failed");
          setImageFileUplaodinProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUplaodinProgress(null);
            setImageFileUplaodinError(null);
            setFormData({...formData, image: downloadURL});
          });
        }
      );
    } catch (error) {
      setImageFileUplaodinError("Image uplaod failed");
      setImageFileUplaodinProgress(null);

      console.log(error);
    }
  };






  const handelSubmit = async (e)=>{
    e.preventDefault()
   
     if(Object.keys(formData).length === 0){
      setpulishError(' add your post information')
      return;
     }
     
     try{
           
             const res = await fetch(`/api/post/create-post`,
                      {
                        method: 'POST',
                        headers:{
                          'Content-Type': 'application/json',
                      },body:JSON.stringify(formData)
                    }
                    );

                    const data = await res.json()
                    console.log('Response Status:', res.status);
                    console.log('Response Body:', data);
                   
                    if(!res.ok){
                      setpulishError(data.message)
                      return
                    }
                    else{
                      setpulishError(null)
                      setpulishSuccess('is published successfuly')
                      navigate(`/post/${data.slug}`)
                      }
             
      }
     catch(error){
      setpulishError('somthing went worng')
     }
  }





  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center  text-3xl my-7 font-semibold">
        {" "}
        Create a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>{setFormData({...formData, title: e.target.value})}}
          />

          <Select  onChange={(e)=>{setFormData({...formData, category: e.target.value})}}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Java Script</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div
          className=" flex gap-4 items-center justify-between border-4 border-teal-500 
          border-dotted p-3 "
        >
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handelUploadImage}
            disabled={imageFileUplaodinProgress}
          >
            {imageFileUplaodinProgress ? (
              <div className=" w-16 h-16">
                <CircularProgressbar
                  value={imageFileUplaodinProgress}
                  text={`${imageFileUplaodinProgress || 0}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62,152,199,${
                        imageFileUplaodinProgress / 100
                      })`,
                    },
                  }}
                />
              </div>
            ) : (
              "Uplaod image"
            )}
          </Button>
        </div>
        {
          imageFileUplaodinError && (
            <Alert color='failure' >
            {imageFileUplaodinError}
            </Alert>
          )
        }
        {
          formData.image && (
            <img src={formData.image} alt="uplaod"
            className="w-full h-72 object-cover " />
            
          )
        }
        <ReactQuill
          className="min-h-[300px] h-52 mb-12 "
          theme="snow"
        
          placeholder="Write somthig..."
          required
          onChange={(value)=>{setFormData({...formData, content:value})}}
            
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"}>
          Publish
        </Button>
         {
          pulishError &&(
            <Alert color='failure'>{pulishError}</Alert>
          )
         }
         {
          pulishSuccess &&(
            <Alert color='success'>{pulishSuccess}</Alert>
          )
         }
      </form>
    </div>
  );
}
