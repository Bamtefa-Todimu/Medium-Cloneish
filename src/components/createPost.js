import React,  {useState,useRef,useEffect} from 'react'

import notificationImg from './images/bell-ring.png'
import menuImg from './images/menu.png'
import PublishPopup from './publishPopup'

import './styles/createPost.css'

const selectedTag = {one:false,two:false,three:false,four:false,five:false,six:false,seven:false}

const CreatePost = ({photoURL,displayName,reRenderMain}) => {

  const [post,setPost] = useState({})
  const [publishActive,setPublicActive] = useState(0)
  const [tagValue,setTag] = useState("Random")
  const [popupActive,setPopupActive] = useState(false)

  const [selectedTags,setSelectedTag] = useState(selectedTag)

  const handleClosePopup = () => {
      setPopupActive(false)
  }

  const handleSubmitPost = async () => {
    const savedPost = await fetch("http://localhost:5000/api/v1/createPost" ,{
      method: "post",
      body:JSON.stringify({
        author:displayName,
        authorPic:photoURL,
        title:titleValue.current.value,
        previewContent:bodyValue.current.value.slice(0,250)+"...",
        postBody: bodyValue.current.value,
        tag:tagValue,
        postTime:Date.now(),
        postDate:new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
      }),
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

  })
  }

  const titleValue = useRef(null)
  const bodyValue = useRef(null)
  

  useEffect(() => {
    console.log(bodyValue.current.value);
    handleSubmitPost()
    reRenderMain(post)
  },[publishActive])

  return (
    <div className='create-section-container'>
      <div className="create-section-wrapper">

        <div className="create-section-header">
            <div className="create-nav-left">
              <div className="logo-container create-logo">
                Md
              </div>

              <p>Draft in {displayName}</p>
            </div>

            <div className="create-nav-right">
              <div className="publish-btn" onClick={() => {setPublicActive(publishActive+1); setPopupActive(true)}}>
                Publish
              </div>

              <div className="create-options">
                  <img src={menuImg} alt="" />
              </div>

              <div className="notifications-btn">
                  <img src={notificationImg} alt="" />
              </div>

              <div className="profile-picture">
                    <img src={photoURL} alt="" />
                </div>
            </div>
        </div>

        <div className="text-section">
          <div className="title-container">
            <textarea ref={titleValue} placeholder='Title' name = "title" rows = {1}/>
          </div>

          <div className="body-container">
            <textarea  ref = {bodyValue}placeholder='Enter Text Here...' name = "body" rows={10} />
          </div>

          <div className="tags-section">
            <div className = "tags-header">Tags: </div> 
            <div className="topics-section" >
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,one:true})}} style = {(selectedTag.one)?{backgroundColor:"green",color:"white"}:{}}>Technology</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,two:true})}} style = {(selectedTag.two)?{backgroundColor:"green",color:"white"}:{}}>Money</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,three:true})}} style = {(selectedTag.three)?{backgroundColor:"green",color:"white"}:{}}>Buisness</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,four:true})}} style = {(selectedTag.four)?{backgroundColor:"green",color:"white"}:{}}>Productivity</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,five:true})}} style = {(selectedTag.five)?{backgroundColor:"green",color:"white"}:{}}>Psychology</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,six:true})}} style = {(selectedTag.six)?{backgroundColor:"green",color:"white"}:{}}>Mindfullness</span>
              <span className='topic' onClick={(e) => {setTag(e.target.innerHTML); setSelectedTag({...selectedTag,seven:true})}} style = {(selectedTag.seven)?{backgroundColor:"green",color:"white"}:{}}>Art</span>
          </div>
          </div>
        </div>
      </div>

      {popupActive?<PublishPopup closePopup = {handleClosePopup}/>:""}
    </div>
  )
}


export default CreatePost