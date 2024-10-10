import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState, useCallback } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import ReactQuill from "react-quill";
import { app } from "../firebase";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"


export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);

  const navigate = useNavigate();
  const { postId } = useParams();
  const {currentUser} = useSelector(state => state.user)

  const updateFormData = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleUploadImage = useCallback(async () => {
    if (!file) {
      setImageUploadError("Please upload an image.");
      return;
    }
    try {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image upload failed.");
          setImageUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateFormData("image", downloadURL);
            setImageUploadError(null);
            setImageUploadProgress(0);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed.");
      setImageUploadProgress(0);
    }
  }, [file]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setPublishError("Add your post information.");
      return;
    }

    try {
      const res = await fetch(`/api/post/update-post/${postId}/${currentUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      setPublishSuccess("Post updated successfully.");

      
    } catch {
      setPublishError("Something went wrong.");
    }
  }, [formData, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
        } else {
          setFormData(data.posts[0]);
          setPublishError(null);
        }
      } catch (error) {
        setPublishError("Failed to fetch post.");
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => updateFormData("title", e.target.value)}
            value={formData.title || ""}
          />

          <Select
            onChange={(e) => updateFormData("category", e.target.value)}
            value={formData.category || "uncategorized"}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nodejs">Node.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress > 0}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  strokeWidth={5}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          value={formData.content || ""}
          className="min-h-[300px] h-52 mb-12"
          theme="snow"
          placeholder="Write something..."
          required
          onChange={(value) => updateFormData("content", value)}
        />

        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>

        {publishError && <Alert color="failure">{publishError}</Alert>}
        {publishSuccess && <Alert color="success">{publishSuccess}</Alert>}
      </form>
    </div>
  );
}
