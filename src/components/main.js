import React, { createContext, useState } from 'react'

import Posts from './posts'
import './styles/main.css'

const Main = ({allPosts,username,following,reRenderMain}) => {

  const renderMainContext = createContext(reRenderMain)

  const [openFollowing,setopenFollowing] = useState(false)
  const [followingPosts,setfollowingPosts] = useState("")
  
  const followersPosts = () => {
    const thePosts = []
    following.forEach((follower) => {
        allPosts.forEach((appP) => {
          if(follower.author === appP.author)
          {
            thePosts.push(appP)
          }
        })
    })
    console.log(thePosts)
    setopenFollowing(true)
    setfollowingPosts(thePosts)
  }
  
  return (
    <section className = "main-section">

      <div className="main-wrapper">

        <div className="main-header">
          <div className="main-plus-btn">
              <svg width="10" height="10" viewBox="0 0 10 10"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H4v4H0v2h4v4h2V6h4V4H6V0z"></path></svg>
          </div>
          <p>Keep up with the latest in any topic</p>
        </div>
        <div className="main-top-section">
          <p className={!openFollowing?"following-btn":"following-btn following-selected"} onClick={() => followersPosts()}>Following</p>
          <p  className={openFollowing?"recommended-btn":"recommended-btn following-selected"} onClick={() => setopenFollowing(false)}>Recommended</p>
        </div>
        

        {openFollowing?
        <Posts allPosts = {followingPosts} renderMainContext = {reRenderMain}username = {username}/>
        :<Posts allPosts = {allPosts} renderMainContext = {reRenderMain} username = {username}/>
        }
      </div>


    </section>
  )
}

export default Main