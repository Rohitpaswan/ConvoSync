import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Message from "../message/Message";
import "./chatArea.css"
import Input from "../input/Input";
const ChatArea = () => {
  return (
    <div className="chatArea">
      <nav className="chatArea__header">
        <div>  <span>User name</span></div>
        <div className="icons">
        <span className="icon"><MdCall/></span>  
        <span className="icon"><FaVideo/></span>  
        <span className="icon"><IoSettings/></span>  
        </div>   
      </nav>
      <div className="messageBox">
        <Message/>
        <Message/>
        <Message/>
      </div>
       <Input/>
    </div>
  )
}

export default ChatArea
