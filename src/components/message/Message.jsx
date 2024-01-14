import React from 'react'
import './message.css'
const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
      <div className="logo-img">
          <img src="https://picsum.photos/200/300?grayscale" alt="" />
        </div>
        <span className='time'>just now</span>
      </div>
      <div className="messageChat">
        <p>hello world , Sending message for test jji lojjb</p>
        {/* <img src="https://picsum.photos/200/300?grayscale" alt="" className='messageImg'/> */}
      </div>
      
    </div>
  )
}

export default Message
