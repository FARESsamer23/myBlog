
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react';
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  console.log(postSlug)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
          setError(true);
          setLoading(false);

          return;
        }
        if (res.ok) {

          setPost(data.posts[0]);

          console.log(data.posts[0])
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  if(loading) return( <div className="flex justify-center items-center min-h-screen">
    <Spinner size='xl'/>
    </div> )

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
              
                  <h1 className="text-3xl mt-10 text-center font-semibold p-3
                  max-w-2xl  mx-auto lg:text-4xl ">{post && post.title} </h1>
                  <Link to={`/search?category=${post && post.category}`} className=" self-center mt-5 " >
                    <Button pill color="gray"size="xs"  >{post && post.category}</Button>
                  </Link>
                    <img  className=" mt-10 p-3 max-h-[1600px] w-full object-cover" src={post && post.image} alt="image"/>
                   <div className=" flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">

                   <span  >{post && new Date(post.updatedAt).toLocaleDateString()}</span>

                   <span >{post && (post.content.length / 1000).toFixed()} means read</span>  
                   </div>

                   <div className="p-3 maw-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}} ></div>

                <div  className="max-w-4xl mx-auto w-full" > 
                    <CallToAction/>
                </div>  

               < CommentSection postId={post && post._id } />

    
    </main>
  );
}
