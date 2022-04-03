import React, { useContext, useEffect, useState } from 'react'
import authorPic from './images/profile.png'
import saveIcon from './images/save.png'
import './styles/singlepost.css'
import { Link } from 'react-router-dom'

const SinglePost = ({_id,author,authorPic,title,previewContent,tag,postDate,username,renderMainContext}) => {

    

    const [updateTriggered,setUpdateTriggered] = useState(0)

    const handleUpdateSaved = async() => {
        const updateSaved = await fetch(`http://localhost:5000/api/v1/updateSaved/${username}`,
        {
            method:"post",
            body:JSON.stringify({_id:_id,author:author,authorPic:authorPic,title:title,previewContent:previewContent,tag:tag,postDate:postDate,username:username}),
            headers:{
                "Content-Type":"application/json"
            }
        })
    }
    
    useEffect(() => {
        if(username && (updateTriggered > 0))
        {
        handleUpdateSaved()
        console.log(username)
        renderMainContext()
    }
    },[updateTriggered])

  return (
    <div className='post'>
        <div className="post-header">
            <div className="author-pic">
                <img src={authorPic} alt="" />
            </div>

            <p className="author-name">{author}</p>
            <span className="post-date">
                    &#x22C5; {postDate}
            </span>
        </div>

        <div className="post-title">
            <Link to = {'/singlePost/' + _id} style={{textDecoration:"none",color:"rgba(41, 41, 41, 1)"}}><h2>{title}</h2></Link>
        </div>

        <p className="preview-content">
            {previewContent}
        </p>

        <div className="postTag">
            <div className="tag">{tag || "general"}</div>
            <div className="save-icon" onClick={() => setUpdateTriggered(updateTriggered+1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="ko"><path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path></svg>
            </div>
        </div>
    </div>
  )
}

export default SinglePost