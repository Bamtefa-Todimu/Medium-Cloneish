import React, { useEffect } from 'react'

import './styles/createPost.css'


export const PublishPopup = ({closePopup}) => {

    useEffect(() => {
        setTimeout(() => {
            closePopup() },1000
        )

    })

  return (
    <div className = "publish-popup-container">
        Post Published
    </div>
  )
}


export default PublishPopup