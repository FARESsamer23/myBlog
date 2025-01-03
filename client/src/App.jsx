/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrolToTop from './components/ScrolToTop'

function App() {


  return (
    <BrowserRouter>
    <ScrolToTop/>
    <Header/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/sign-in" element={<SignIn/>}/>
       <Route path="/sign-up" element={<SignUp/>}/>
       <Route path="/projects" element={<Projects/>}/>
       <Route path="/post/:postSlug" element={<PostPage/>}/>
       <Route element={<PrivateRoute/>} >
         <Route path="/dashboard" element={<Dashboard/>}/>
       </Route>
       <Route element={<OnlyAdminPrivateRoute/>} >
         <Route path="/create-post" element={<CreatePost/>}/>
         <Route path="/update-post/:postId" element={<UpdatePost/>}/>
         
       </Route>

      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App
