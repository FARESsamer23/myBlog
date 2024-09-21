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

export default function CreatePost() {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [imageFileUplaodinProgress, setImageFileUplaodinProgress] = useState(0);
  const [imageFileUplaodinError, setImageFileUplaodinError] = useState(null);
  const [formData, setFormData] = useState({});
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
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center  text-3xl my-7 font-semibold">
        {" "}
        Create a Post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />

          <Select>
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
          value={value}
          onChange={setValue}
          placeholder="Write somthig..."
          required
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"}>
          Publish
        </Button>
      </form>
    </div>
  );
}
