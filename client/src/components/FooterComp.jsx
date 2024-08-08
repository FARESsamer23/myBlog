import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook,BsInstagram,BsGithub,BsLinkedin }  from 'react-icons/bs'
export default function FooterComp() {
  return (
    <Footer container  className='border border-t-4 border-blue-800 mb-2'>
      <div className=' w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1 '>
         
        <div className=''>
            <Link
            to={"/"}
            className="self-center whitespace-nowrap text-sm sm:text-xl
             font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-800  h-12 rounded-md
             text-white">
              Fares&apos;s Blog
            </span>
            
          </Link>
            </div>
            <div className=' mt-2 grid grid-cols-2 gap-3 sm:mt-4  sm:grid-cols-3 sm:gap-6'>
                <div className=''>
                <Footer.Title title='About'/>
                <Footer.LinkGroup col>
                   <Footer.Link
                      href='https://www.100jsprojects.com'
                      target='_blank'
                      rel='noopener norferrer'
                   >
                   100 JS Project 
                   </Footer.Link>
                   <Footer.Link
                   href='#'
                   target='_blank'
                   rel='noopener norferrer'
                >
                Fares&apos;s Blog
                </Footer.Link>
                </Footer.LinkGroup>
                </div>

                <div className=''>
                <Footer.Title title='Follow us'/>
                <Footer.LinkGroup col>
                   <Footer.Link
                      href='#'
                      target='_blank'
                      rel='noopener norferrer'
                   >
                   Github
                   </Footer.Link>
                   <Footer.Link
                   href='#'
                   target='_blank'
                   rel='noopener norferrer'
                >
                Instagram
                </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div className=''>
                <Footer.Title title='Legal'/>
                <Footer.LinkGroup col>
                   <Footer.Link
                      href='#'
                      target='_blank'
                      rel='noopener norferrer'
                   >
                   Privacy Policy
                   </Footer.Link>
                   <Footer.Link
                   href='#'
                   target='_blank'
                   rel='noopener norferrer'
                >
                Terms &amp; Conditions
                </Footer.Link>
                </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:justify-between sm:items-center '>
        <Footer.Copyright  href='#' by='Fares Blog'year={new Date().getFullYear()} />
          <div className='flex sm:justify-center gap-6 mt-4  sm:mt-0'>
          <Footer.Icon href='#' icon={BsFacebook} />
          <Footer.Icon href='#' icon={BsInstagram} />
          <Footer.Icon href='#' icon={BsGithub} />
          <Footer.Icon href='#' icon={BsLinkedin} />
          </div>
        </div>

      </div>
    </Footer>
  )
}
