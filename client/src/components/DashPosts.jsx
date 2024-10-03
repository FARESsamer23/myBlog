/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, SetUserPosts] = useState([]);

  const [showMore, setShowmore] = useState(true);
  const [showModele, setShowmodel] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          SetUserPosts(data.posts);
          console.log(userPosts);
          if (data.posts.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handelShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        SetUserPosts([...userPosts, ...data.posts]);

        console.log(userPosts);

        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelDeletPoste = async () => {
    setShowmodel(false);

    try {
      const res = await fetch(
        `/api/post/delete-post/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        console.log(data.message);

        SetUserPosts((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className=" table-auto  overflow-x-scroll  md:mx-auto p-3 
    scrollbar scrollbar-track-slate-100
     scroll scrollbar-thumb-slate-300  
     dark:scrollbar-track-slate-700
     dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md ">
            <Table.Head>
              <Table.HeadCell> Date Updated</Table.HeadCell>
              <Table.HeadCell> Post image </Table.HeadCell>
              <Table.HeadCell> Post Title </Table.HeadCell>
              <Table.HeadCell> Catergory </Table.HeadCell>
              <Table.HeadCell> Delete </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post, index) => (
              <Table.Body key={index} className=" divide-y">
                <Table.Row className="dark:bg-gray-800 bg-white">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowmodel(true);
                        setPostId(post._id);
                        console.log(post._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-teal-500  hover:underline"
                    >
                      <span>Edit </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handelShowMore}
              className=" w-full  text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <div className="text-center  mx-auto   bg-gray-400 ">
          You have no posts yet
        </div>
      )}

      <Modal
        show={showModele}
        onClose={() => {
          setShowmodel(false);
        }}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
          <div className=" text-center ">
            <h3 className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-400">
              {" "}
              Are you sure you want to delete Post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handelDeletPoste}>
                Yes, I'am sure
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setShowmodel(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
