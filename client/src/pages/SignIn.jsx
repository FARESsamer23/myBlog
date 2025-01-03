

import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from "../redux/User/userSlice";
                                                          
import Oauth from "../components/Oauth";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading: Loading ,error: errormeassage} = useSelector( state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      
      return dispatch(signInFailure("Please fill in all fields"))
      
    }
    try {
     dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFailure(data.message))
      }
     
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } catch (err) {
     dispatch(signInFailure(err.message))
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left side */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-teal-400  h-12 rounded-md
     text-white"
            >
              Fares&apos;s Blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            {" "}
            This a demo project. You can sign in with your email and password or
            with Google.
          </p>
        </div>
        {/*right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
               className="bg-teal-400"
              type="submit"
              disabled={Loading}
            >
              {Loading ? (
                <>
                  <Spinner size="sm" color="white" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <Oauth/>
          </form>

          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-up">
              Sign up
            </Link>
          </div>
          {errormeassage && (
            <Alert className="mt-5" color="failure">
              {errormeassage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
