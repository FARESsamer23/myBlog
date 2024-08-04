import { Link,  useNavigate} from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
export default function SignUp() {
       const [formData,setFormData] = useState({})
      const [errormeassage, setErrormeassage] = useState(null)
      const [Loading, setLoading] = useState(null)
      const navigate = useNavigate()
  const handleChange = (e)=>{
            setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async (e)=>{
     e.preventDefault();
     if( !formData.username || !formData.email || !formData.password){
      return setErrormeassage("Please fill in all fields");
     }
     try{
      setLoading(true)
      setErrormeassage(null)
     const res = await fetch('/api/auth/signup',{

      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData)
     })
const data = await res.json();
  console.log(data)
if(data.success == false){
  return setErrormeassage(data.message);
}
setLoading(false)
if(res.ok){
  navigate('/sign-in')
}
  }catch(err){
    setLoading(false)
      console.log(err)
      setErrormeassage(err.message);
  }}

    return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left side */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-800  h-12 rounded-md
     text-white"
            >
              Fares&apos;s Blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            {" "}
            This a demo project. You can sign up with your email and password or
            with Google.
          </p>
        </div>
        {/*right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
            </div>

            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@gmail.com" id="email" onChange={handleChange}/>
            </div>

            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="password" id="password" onChange={handleChange} />
            </div>

            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={Loading}>
           {
            Loading ? (
                 <>
              <Spinner size="sm" color="white"/>
              <span className="pl-3">Loading...</span>
              </>
            ):('Sign Up')
           }
            </Button>
          </form>
          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-in">
              Sign In
            </Link>
          </div>
          {
            errormeassage && (
               <Alert className="mt-5" color='failure'>
                  {errormeassage}
               </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
