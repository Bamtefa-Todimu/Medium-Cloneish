import React, { useContext } from 'react'

import SinglePost from './singlePost'
import data from '../data'


const Posts = ({allPosts,username,renderMainContext}) => {

  if(allPosts){
  return (
    <div className = "posts-section">
        {allPosts.map((post) => {
            return <SinglePost key = {post._id} {...post} renderMainContext = {renderMainContext} username={username}/>
        })}
        </div>
  )}
  return(<div>no posts</div>)
}

export default Posts