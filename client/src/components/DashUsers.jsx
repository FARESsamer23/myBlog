/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineCheck,AiOutlineClose  } from "react-icons/ai";

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, SetUsers] = useState([]);
  
    const [showMore, setShowmore] = useState(true);
    const [showModele, setShowmodel] = useState(false);
    const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/user/getusers`);

          const data = await res.json();
  
          if (res.ok) {
            SetUsers(data.users);
            console.log(users);
            if (data.users.length < 9) {
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
      const startIndex = SetUsers.length;
  
      try {
        const res = await fetch(
          `/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`
        );
        const data = await res.json();
  
        if (res.ok) {
            SetUsers([...users, ...data.users]);
  
          console.log(users);
  
          if (data.users.length < 9) {
            setShowmore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handelDeletUser = async () => {
      setShowmodel(false);
  
      try {
        const res = await fetch(
          `/api/user/deleteUserByAdmin/${userId}/${currentUser._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
  
        if (res.ok) {
          console.log(data.message);
  
          SetUsers((prev) => prev.filter((user) => user._id !== userId));
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
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className=" shadow-md ">
              <Table.Head>
                <Table.HeadCell> Date Created</Table.HeadCell>
                <Table.HeadCell> user image </Table.HeadCell>
                <Table.HeadCell> username </Table.HeadCell>
                <Table.HeadCell> email </Table.HeadCell>
                <Table.HeadCell> admin </Table.HeadCell>
                <Table.HeadCell>
                  <span>delete</span>
                </Table.HeadCell>
              </Table.Head>

              {users.map((user, index) => (
                <Table.Body key={index} className=" divide-y">
                  <Table.Row className="dark:bg-gray-800 bg-white">
                    <Table.Cell >
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/user/${user.username}`}>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 rounded-full object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/user/${user.username}`}
                      >
                        {user.username}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
  
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowmodel(true);
                          setUserId(user._id);
                          console.log(user._id);
                        }}
                        className="text-red-500 hover:underline cursor-pointer text-center"
                      >
                          {user.isAdmin? <AiOutlineCheck  className="text-teal-500 text-2xl font-medium"/>:<AiOutlineClose 
                            className="text-red-500 text-2xl font-medium"
                            /> }
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                    <span
                    onClick={() => {
                      setShowmodel(true);
                      setUserId(user._id);
                      console.log(user._id);
                    }}
                    className="text-red-500 hover:underline cursor-pointer text-xs font-medium"
                  >
                      delete
                  </span>
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
            You have no users yet
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
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handelDeletUser}>
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
  