import React, {useState,useEffect} from 'react'

import Posts from './posts'

import './styles/savedPost.css'

const MyPosts = ({allPosts,username,saved}) => {


  return (
    <section className = "main-section">

      <div className="main-wrapper">

        <div className="main-header">
          <h1>Your Stories</h1>
        </div>

        <div className="main-top-section mts">
          <p>Posts</p>
        </div>
        
        

        
        <Posts allPosts = {allPosts.reverse().filter((post) => post.author === username)}/>
      </div>


    </section>
  )
}

export default MyPosts