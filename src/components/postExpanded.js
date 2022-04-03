import userEvent from '@testing-library/user-event'
import React , {useEffect,useState,useRef,useContext,createContext, useMemo}from 'react'
import { UNSAFE_LocationContext, useParams } from 'react-router-dom'

import './styles/postexpanded.css'
import likesImg from './images/likes.svg'
import commentImg from './images/comment.svg'
import saveImg from './images/save.png'

import data from '../data'
import { Link } from 'react-router-dom'

import searchIcon from './images/search.png'
import closeIcon from './images/close.png'

const postInfo = createContext()

const PostExpanded = ({displayName,photoURL}) => {
    const {id:postId} = useParams() 

    const [post,setPost] = useState("")
    const [showComment,setShowComment] = useState(false)
    const [userInfo,setUserInfo] = useState("")
    const [reRender,setReRender] = useState(0)

    const triggerReRender = () => {
        setReRender(reRender+1)
    }

     const handleFetchUserInfo = async () => {
        const uif = await fetch(`http://localhost:5000/api/v1/getUser/${post.author}`)
        const userInformation = await uif.json()
        console.log(userInformation);
        if(userInformation)setUserInfo(userInformation)
    }


    const handleShowComment = () => {
        setShowComment(!showComment)
    }

    const handleUpdateCommentValue = (newComments) => {
        setPost({...post,comments:newComments})
    }

    const handleFetchSinglePost = async() => {
        const post = await fetch(`http://localhost:5000/api/v1/post/${postId}`)
        const retrievedPost = await post.json()
        console.log(retrievedPost);
        setPost(retrievedPost)
    }

    useEffect(() => {
        handleFetchUserInfo()

    },[post,reRender])

    useEffect(()=>{
        handleFetchSinglePost()
    },[])
  return (
    <div className = "post-expanded-container">
        <postInfo.Provider value={post}>
            <PostMain showComment = {handleShowComment}/>
            <PostRight {...post} {...userInfo} actualUser={displayName} triggerRender = {triggerReRender}/>
            {showComment?<CommentSection updateCommentNum = {handleUpdateCommentValue}actualUser={displayName} actualUserPic = {photoURL} showComment = {handleShowComment}/>:""}
        </postInfo.Provider>
    </div>
  )
}

const PostMain = ({showComment}) => {

    const {_id,author,authorPic,postDate,title,postBody,likes,comments} = useContext(postInfo)
    const {id} = useParams()

    const [postedLikes,setPostedLikes] = useState(likes)
    const [likeTriggered,setLikeTriggered] = useState(0);


    const handleUpdateLikes = async () => {
        const handleLike = await fetch(`http://localhost:5000/api/v1/updateLikes/${id}`,{
            method:"post",
            body:JSON.stringify({likes:postedLikes}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })
        const returnedLike = await handleLike.json()
        if(!postedLikes)setPostedLikes(returnedLike.likes)
    }

    const handleLikeUpdate = () => {
        setPostedLikes(postedLikes+1)
    }

    useEffect(() => {
        handleUpdateLikes()
    },[postedLikes])

    // useEffect(() => {
    //     console.log("postedd"+ postedLikes);
    //     if(postedLikes)handleUpdateLikes()
    // },[likeTriggered])
    
    return (
        <section className = "postmain-container">
            <div className="postmain-wrapper">
                <div className="postmain-header">
                    <div className="post-author-pic"><img src={authorPic} alt="" /></div>
                    <div className="post-author-info">
                        <p className='post-author-name'>{author}</p>
                        <p className = "post-expanded-date">{postDate}</p>
                    </div>
                </div>
                <div className="postmain-title">
                    <h1>{title}</h1>
                </div>
                <div className="postmain-body">
                    {postBody}
                </div>

                <div className="post-actions">
                    <div className="actions-left">
                        <div className="like-container" onClick = {() => handleLikeUpdate()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="clap"><path fillRule="evenodd" clipRule="evenodd" d="M11.37.83L12 3.28l.63-2.45h-1.26zM15.42 1.84l-1.18-.39-.34 2.5 1.52-2.1zM9.76 1.45l-1.19.4 1.53 2.1-.34-2.5zM20.25 11.84l-2.5-4.4a1.42 1.42 0 0 0-.93-.64.96.96 0 0 0-.75.18c-.25.19-.4.42-.45.7l.05.05 2.35 4.13c1.62 2.95 1.1 5.78-1.52 8.4l-.46.41c1-.13 1.93-.6 2.78-1.45 2.7-2.7 2.51-5.59 1.43-7.38zM12.07 9.01c-.13-.69.08-1.3.57-1.77l-2.06-2.07a1.12 1.12 0 0 0-1.56 0c-.15.15-.22.34-.27.53L12.07 9z"></path><path fillRule="evenodd" clipRule="evenodd" d="M14.74 8.3a1.13 1.13 0 0 0-.73-.5.67.67 0 0 0-.53.13c-.15.12-.59.46-.2 1.3l1.18 2.5a.45.45 0 0 1-.23.76.44.44 0 0 1-.48-.25L7.6 6.11a.82.82 0 1 0-1.15 1.15l3.64 3.64a.45.45 0 1 1-.63.63L5.83 7.9 4.8 6.86a.82.82 0 0 0-1.33.9c.04.1.1.18.18.26l1.02 1.03 3.65 3.64a.44.44 0 0 1-.15.73.44.44 0 0 1-.48-.1L4.05 9.68a.82.82 0 0 0-1.4.57.81.81 0 0 0 .24.58l1.53 1.54 2.3 2.28a.45.45 0 0 1-.64.63L3.8 13a.81.81 0 0 0-1.39.57c0 .22.09.43.24.58l4.4 4.4c2.8 2.8 5.5 4.12 8.68.94 2.27-2.28 2.71-4.6 1.34-7.1l-2.32-4.08z"></path></svg>
                            <p className="like-count">{postedLikes?postedLikes:0}</p>
                        </div>
                        <div className="comments-container" onClick={() => showComment()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="responses" class="nv"><path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path></svg>
                            <p className="comment-count">{comments?comments.length:0}</p>
                        </div>
                    </div>
                    <div className="actions-right">
                        <div className="save-container">
                            <img src={saveImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
const PostRight = ({author,authorPic,actualUser,profilePhoto,username,email,followers,triggerRender}) => {


    const [followTriggered,setFollowTriggered] = useState("")
    const [hasFollowed,setHasFollowed] = useState(false)
   
    

   const checkIfFollowing = () => {
       followers.forEach((follower) => {
           if(follower.author === actualUser)
           {
               setHasFollowed(true)
           }
       })
   }
    

    const handleUserFollowing = async() =>{
        const followHandled = await fetch(`http://localhost:5000/api/v1/followUser/${author}`, {
            method:"post",
            body:JSON.stringify({author:actualUser}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })
    }
    const handleUserUnFollowing = async() =>{
        const unfollowHandled = await fetch(`http://localhost:5000/api/v1/unfollowUser/${author}`, {
            method:"post",
            body:JSON.stringify({author:actualUser}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })
    }

    

    useEffect(()=>{
        if(followers && !followTriggered)
        {
            checkIfFollowing()
        }
    })

    useEffect(() => {
        if(followTriggered === "follow" )
        {
            handleUserFollowing()
        }
        else if(followTriggered === "unfollow")
        {
            handleUserUnFollowing()
        }
        triggerRender()

        
        

        
    },[followTriggered])
    
    

    return(
        <section className = "rightNav">
      <div className="right-nav-wrapper">
        <div className="latest-news-btn">
          Get Latest News
        </div>
        <div className="search-container">
          <div className="search-icon-container">
            <img src={searchIcon} alt="" />
          </div>
          <input placeholder = "Search" type="search" name="" id="" />
        </div>

        <div className="author-profile-section">
            <div className="author-profile-header">
                <div className="author-profile-header-pic">
                    <img src={profilePhoto} alt="" />
                    </div>
                <p>{username}</p>
            </div>


            <div className="author-profile-desc">
                {email}
            </div>
            <div className="followers-count" style={{color:"gray",fontSize:"0.9rem",marginBottom:"1rem"}}>
                {followers ? followers.length:0} followers
            </div>

            <div className="author-profile-actions">
                {
                    ((followTriggered === "" || followTriggered === "unfollow") && !hasFollowed)?

                    <div className="follow-btn" onClick={() => {setFollowTriggered("follow");setHasFollowed(true)}}>
                    Follow
                    </div> :  <div className="follow-btn unfollow-btn" onClick={() => {setFollowTriggered("unfollow");setHasFollowed(false)}}>
                    following
                    </div>
                }
                <div className="subscribe-btn">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" class="um pc pd"><rect x="26.25" y="9.25" width="0.5" height="6.5" rx="0.25" stroke-width="0.5"></rect><rect x="29.75" y="12.25" width="0.5" height="6.5" rx="0.25" transform="rotate(90 29.75 12.25)" stroke-width="0.5"></rect><path d="M19.5 12.5h-7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5" stroke-linecap="round"></path><path d="M11.5 14.5L19 20l4-3" stroke-linecap="round"></path></svg>
                </div>
            </div>
        </div>


        <div className="recommended-topics-section">
          <p>Recommended topics</p>

          <div className="topics-section">
            <span className='topic'>Technology</span>
            <span className='topic'>Money</span>
            <span className='topic'>Buisness</span>
            <span className='topic'>Productivity</span>
            <span className='topic'>Psychology</span>
            <span className='topic'>Mindfullness</span>
            <span className='topic'>Art</span>
          </div>
        </div>


      </div>
    </section>
    )
}

const CommentSection = ({updateCommentNum,actualUser,actualUserPic,showComment}) => {
    const {id} = useParams()


    const {_id,author,authorPic,postDate,title,postBody,likes,comments} = useContext(postInfo)

    const [postedComments,setPostedComments] = useState(comments)
    const [showCommentBoxComponents,setShowCommentBoxComponents] = useState(false)
    const commentValue = useRef(null)

    const handleShowCommentBoxComponents = () => {
        setShowCommentBoxComponents(true)
    }

    const handleUpdateComments = async () => {
        const handleLike = await fetch(`http://localhost:5000/api/v1/updateComments/${id}`,{
            method:"post",
            body:JSON.stringify({comment:postedComments}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
        })
        const returnedComment = await handleLike.json()
        if(!postedComments)setPostedComments(returnedComment.comments.reverse())
    }

    const handleCommentUpdate = () => {
        setPostedComments([...postedComments,{author:actualUser,authorPic:actualUserPic,datePosted:new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
      ,comment:commentValue.current.value}].reverse())
    }
    
    useEffect(() => {
        handleUpdateComments()
        updateCommentNum(postedComments)
    },[postedComments])

    return(
        <>
            <div className="comments-container-full" >

                <div className="comments-close-container" onClick={() => showComment()}>

                </div>


                <div className="comments-container-inner">
                    <div className="comments-container-inward">

                    
                    <div className="comments-inner-top">
                        <div className="inner-top-header">
                            <h3>Responses({postedComments.length})</h3>
                            <img src={closeIcon} alt="" className="comment-close-btn" onClick={() => showComment()} />
                        </div>

                        <div className="inner-top-textarea">
                            {showCommentBoxComponents?<div className="textarea-top-strip">
                                <div className="author-pic">
                                    <img src={actualUserPic} alt="" />
                                </div>

                                <p className="author-name">{actualUser}</p>
                            </div>:""}

                            <div className="textarea-textarea" onClick = {() => handleShowCommentBoxComponents()}>
                                <textarea ref = {commentValue} placeholder = "What are your thoughts?" name="singleComment" id="comment-box" cols="5"  rows = "5" className="comment-box"></textarea>
                            </div>

                            {showCommentBoxComponents?<div className="textarea-submit-section">
                                <p>Cancel</p>
                                <div className="respond-btn" onClick={() => handleCommentUpdate()}>Respond</div>
                            </div>:""}
                        </div>
                    </div>

                    <div className="previous-comments-section">
                        <div className="prev-comments-header">
                            MOST RELEVANT
                        </div>

                        <div className="prec-comments-container">
                            {
                                postedComments.reverse().map((comment,index) => {
                                    return <PreviousComments key = {index} comment = {comment}/>
                                })
                            }
                        </div>
                    </div>

                    </div>
                    <div className = 'scroll-info'>Scroll up to see comments</div>
                </div>
            </div>
        </>
    )
}

const PreviousComments = ({comment}) => {


    return(
        <div className="prev-comments-container">
            <div className="prev-comment-container-head">
                <div className="author-pic">
                    <img src={comment.authorPic} alt="" />
                </div>
                <div className="comment-container-head-info">
                    <p>{comment.author}</p>
                    <p className='date-posted'>{comment.datePosted}</p>
                </div>
            </div>

            <div className="comment-value-container">
                {comment.comment}
            </div>
        </div>
    )
}

export default PostExpanded