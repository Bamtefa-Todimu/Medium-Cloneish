import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

import Posts from './posts'

import './styles/savedPost.css'

const MyPosts = ({allPosts,username,saved}) => {

    const {id:tag} = useParams()


  return (
    <section className = "main-section">

      <div className="main-wrapper">

        <div className="main-header">
          <h1>{tag}</h1>
        </div>

        <div className="main-top-section mts">
          <p>Posts</p>
        </div>
        
        

        
        <Posts allPosts = {allPosts.reverse().filter((post) => post.tag === tag)}/>
      </div>


    </section>
  )
}

export default MyPosts