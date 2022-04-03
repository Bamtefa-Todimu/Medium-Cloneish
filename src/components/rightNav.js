import React ,{createContext, useContext} from 'react'
import './styles/rightNav.css'
import data from '../data'
import { Link } from 'react-router-dom'

import searchIcon from './images/search.png'
// import authorPic from './images/profile.png'

const userAllPosts = React.createContext()

const rightNav = ({allPosts}) => {
  return (

    <userAllPosts.Provider value={allPosts}>
      
    <section className = "rightNav">
      <div className="right-nav-wrapper">
        <div className="latest-news-btn">
          Get Latest News
        </div>
        <div className="search-container">
          <div className="search-icon-container">
            <img src={searchIcon} alt="" />
          </div>
          <input placeholder= "Search" type="search" name="" id="" />
        </div>

        <div className="what-were-reading">
          <span>War in Ukraine:</span> What We're Reading
        </div>

        <div className="posts-section">
          <LatestPosts/>
        </div>

        <Link to = "/" style={{color:"rgb(26, 137, 23)",textDecoration:"none",fontWeight:"300"}}>
          See the full list
        </Link>


        <div className="recommended-topics-section">
          <p>Recommended topics</p>

          <div className="topics-section">
            <Link to = "/tags/Technology" style={{textDecoration:"none",color:"black"}}><span className='topic'>Technology</span></Link>
            <Link to = "/tags/Money" style={{textDecoration:"none",color:"black"}}><span className='topic'>Money</span></Link>
            <Link to = "/tags/Buisness" style={{textDecoration:"none",color:"black"}}><span className='topic'>Buisness</span></Link>
            <Link to = "/tags/Productivity" style={{textDecoration:"none",color:"black"}}><span className='topic'>Productivity</span></Link>
            <Link to = "/tags/Psychology" style={{textDecoration:"none",color:"black"}}><span className='topic'>Psychology</span></Link>
            <Link to = "/tags/Mindfullness" style={{textDecoration:"none",color:"black"}}><span className='topic'>Mindfullness</span></Link>
            <Link to = "/tags/Art" style={{textDecoration:"none",color:"black"}}><span className='topic'>Art</span></Link>
          </div>
        </div>


      </div>
    </section>

    </userAllPosts.Provider>
  )
}

const LatestPosts = () => {
  const allPosts = useContext(userAllPosts)
  return (
    <>
      {allPosts.slice(0,3).map((post) => {
        return <Post key = {post._id} {...post}/>
      })}
    </>
  )
}

const Post = ({authorPic,author,title}) => {

  
  return(
    <div className="rightNav-post">
      <div className="post-header">
        <div className="author-pic">
          <img src={authorPic} alt="" />
        </div>
        <p>{author}</p>
      </div>

      <h3 className="post-title">
        {title}
      </h3>
    </div>
  )
}

export default rightNav