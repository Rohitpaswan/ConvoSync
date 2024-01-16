import React, { useContext, useEffect, useRef } from 'react'
import './message.css'
import { useAuthContext } from '../../context/AuthContextProvider';
import { ChatContext } from '../../context/ChatContext';
const Message = ({message}) => {
  const  currentUser = useAuthContext();
 
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
      <div className="logo-img">
          <img  src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" />
        </div>
        <span className='time'>just now</span>
      </div>
      <div className="messageChat">
      <p>{message.text}</p>
      
      </div>
      
    </div>
  )
}

export default Message
