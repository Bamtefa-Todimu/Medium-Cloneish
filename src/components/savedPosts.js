import React, {useState,useEffect} from 'react'

import Posts from './posts'

import './styles/savedPost.css'

const SavedPosts = ({allPosts,username,saved}) => {

  // const [openFollowing,setopenFollowing] = useState(false)
  // const [saved,setSavedPosts] = useState("")
  
  // const followersPosts = () => {
  //   const savedPosts = []
  //   saved.forEach((savedpost) => {
  //       allPosts.forEach((post) => {
  //         if(saved.author === post.author)
  //         {
  //           savedPosts.push(post)
  //         }
  //       })
  //   })
  //   console.log(thePosts)
  //   setopenFollowing(true)
  //   setfollowingPosts(thePosts)
  // }
  return (
    <section className = "main-section">

      <div className="main-wrapper">

        <div className="main-header">
          <h1>Your lists</h1>
        </div>

        <div className="main-top-section mts">
          <p>Saved</p>
        </div>
        
        

        
        <Posts allPosts = {saved?saved.reverse():saved} username = {username}/>
      </div>


    </section>
  )
}

export default SavedPosts