import React from 'react'
import './chats.css'
const Chats = () => {
  return (
    <div className='chats'>
        <div className="userChat">
        <div className="userAvatar">
          <img
            src="https://picsum.photos/id/237/200/300"
            className="userImg"
            alt=""
          />
        </div>
        <div className="messageContainer" >
          <span className="username"> noodles</span>
          <p className='message'> Thanks </p>
        </div>
      </div>


      <div className="userChat">
        <div className="userAvatar">
          <img
            src="https://picsum.photos/id/237/200/300"
            className="userImg"
            alt=""
          />
        </div>
        <div className="messageContainer" >
          <span className="username"> noodles</span>
          <p className='message'> Thanks </p>
        </div>
      </div>



      <div className="userChat">
        <div className="userAvatar">
          <img
            src="https://picsum.photos/id/237/200/300"
            className="userImg"
            alt=""
          />
        </div>
        <div className="messageContainer" >
          <span className="username"> noodles</span>
          <p className='message'> Thanks </p>
        </div>
      </div>

      
      
    </div>
  )
}

export default Chats
