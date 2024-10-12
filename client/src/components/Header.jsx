import { Avatar, Button, Dropdown, Navbar, NavbarLink, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon,FaSun} from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux"
import { toggleTheme } from "../redux/Theme/themeSlice";
import {signoutSuccess } from '../redux/User/userSlice';

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  const{theme} = useSelector(state => state.theme)
 const dispatch = useDispatch()
    const path = useLocation().pathname;
    
 const hanedleSignout = async ()=>{
  try{
    const res = await fetch(`/api/user/signout`, {
      method: 'POST'});
      const data = res.json();
      if(!res.ok){
         console.log(data.message)
        }
        else{
          dispatch(signoutSuccess())
        }

  }catch(error){
      console.log(error.message)
      
  }
}
  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-lg
         font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-teal-400  h-12 rounded-md
         text-white">
          Fares&apos;s Blog
        </span>
        
      </Link>
      <form>
      <TextInput
          teyp="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className=" hidden lg:inline "
      />
      </form>
      <Button className="w-12  h-10 lg:hidden" color="gray" pill>
      <AiOutlineSearch/>
      </Button>

      <div className="flex gap-2 md:order-2">

         <Button className="w-12 h-10 hidden sm:inline " color="gray" pill onClick={()=>dispatch(toggleTheme())}>
          { theme=== 'dark' ?  <FaSun/>:<FaMoon/>}
         </Button>
          { 
            currentUser ? (<Dropdown
              arrowIcon={false} inline label={
                <Avatar
                alt="user"
                 img={currentUser.profilePicture} 
                 rounded/>
              }>
              <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm  font-medium truncate">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
               <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={hanedleSignout}>Sign out</Dropdown.Item>
              </Dropdown>
           ):( <Link to="/sign-in">
              <Button  gradientDuoTone="purpleToBlue" outline>
                Sign In
             </Button>
              </Link>  )
         
          }
          <Navbar.Toggle/>       
      </div>
      
      <Navbar.Collapse>
                 <NavbarLink active={path === "/"} as={'div'}>
                   <Link to="/">Home</Link>
                 </NavbarLink>

                 <NavbarLink  active={path === "/about"} as={'div'}>
                   <Link to="/about">About</Link>
                 </NavbarLink>

                 <NavbarLink  active={path === "/projects"} as={'div'}>
                   <Link to="/projects">Projects</Link>
                 </NavbarLink>
                 
              </Navbar.Collapse> 
    </Navbar>
  );
}
