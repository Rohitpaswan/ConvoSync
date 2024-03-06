import "./message.css";
import { useAuthContext } from "../../context/AuthContextProvider";

const Message = ({ message }) => {
  const currentUser = useAuthContext();

  return (
    <div
      className={`message__container ${message.senderId === currentUser.uid &&
        "owner"}`}
    >
      {/* <div className="messageInfo">
        <div className="logo-img">
          <img  src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt="" style={{width: "50px", height:"50px"}}/>
        </div> 
      </div> */}
      <div className="message__wrapper">
        <div className="messageChat">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
