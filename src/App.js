import './App.css';
import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from './components/navbar'
import Main from './components/main'
import CreatePost from './components/createPost'
import SavedPost from './components/savedPosts'
import RightNav from './components/rightNav'
import LoginSection from './components/login' 
import PostExpanded from './components/postExpanded';
import MyPosts from './components/myPosts'
import profilePic from './components/images/profile.png'
import Tags from './components/tags'



function App() {

  const [loggedIn,setLoggedIn] = useState(window.localStorage.getItem("isLoggedIn"))
  const [userDetails,setUserDetails] = useState(null)
  const [newPost,setNewPost] = useState(null)
  const [allPosts,setAllPosts] = useState({})
  const [createdUser,setCreatedUser] = useState({})
  const [reRender,setReRender] = useState(0)

  const retrieveUserDetails = (userDet) => {

      setUserDetails(userDet)

      // setLoggedIn(true)
  }

  const createNewUser = async ({displayName:username,email,photoURL:profilePhoto,uid}) => {
      const newUser = await fetch("http://localhost:5000/api/v1/createUser",
      {
        method:"post",
        body:JSON.stringify({username,email,profilePhoto,uid}),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      const newUserCreated = await newUser.json()
      setCreatedUser(newUserCreated)
  }

  const reRenderFromChild = () => {
    setReRender(reRender+1)
  }

  const reRenderMain = (newPost) => {
    setNewPost(newPost)
    fetchAllPosts()
  }

  const fetchAllPosts = async () => {
    const allPosts = await fetch("http://localhost:5000/api/v1/getAllPosts")
    const result = await allPosts.json()
    console.log(result)
    
    setAllPosts(result)
  }

  useEffect(() => {
    if(userDetails)createNewUser(userDetails)
  },[userDetails,reRender])

  useEffect(() => {
    let isUnmounted =true
    fetchAllPosts()
    return () => {isUnmounted = false}
  },[newPost,reRender])

  if( !loggedIn || !userDetails )
  {
    return (
    <>
      <LoginSection  retrieveUserDetails = {retrieveUserDetails} />
    </>
  );
  }
  return (
    <>
      <div className = "site-container">
        <div className='home-container'>
          <Router>
            
            
            <Routes>
               <Route exact path ='/' element = {<><Navbar {...userDetails}/><Main {...userDetails} {...createdUser} reRenderMain = {reRenderFromChild} allPosts = {allPosts}/><RightNav allPosts = {allPosts}/></>}/>
               <Route exact path  = "/savedPost" element = {<><Navbar {...userDetails}/><SavedPost {...userDetails} {...createdUser}/><RightNav allPosts = {allPosts}/></>}/>
               <Route exact path  = "/myPosts" element = {<><Navbar {...userDetails}/><MyPosts allPosts= {allPosts} {...userDetails} {...createdUser}/><RightNav allPosts = {allPosts}/></>}/>
               <Route exact path  = "/createPost" element = {<CreatePost {...userDetails} reRenderMain = {reRenderMain}/>}/>     
               <Route exact path = "/singlePost/:id" element = {<><Navbar {...userDetails}/><PostExpanded {...userDetails}/></>}/>
               <Route exact path = "/tags/:id" element = {<><Navbar {...userDetails}/><Tags allPosts={allPosts} {...userDetails} {...createdUser}/><RightNav allPosts = {allPosts}/></>}/>
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
