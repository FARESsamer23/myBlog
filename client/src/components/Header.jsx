import { Button, Navbar, NavbarLink, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from "react-icons/fa";
export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-lg
         font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-800  h-12 rounded-md
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

         <Button className="w-12 h-10 hidden sm:inline " color="gray" pill>
         <FaMoon/>
         </Button>
           
          <Link to="/sign-in">
          <Button  gradientDuoTone="purpleToBlue" outline>
            Sign In
         </Button>
          </Link>  
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
