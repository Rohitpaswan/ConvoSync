import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import Message from "../message/Message";
import "./chatArea.css";
import Input from "../input/Input";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const ChatArea = () => {
  const currentUser = useAuthContext();
  const { data } = useContext(ChatContext);
  // console.log("curent", currentUser);
  // console.log(data);
  const[messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)
  return (
    <div className="chatArea">
      <nav className="chatArea__header">
        <div className="selectUser__name">
          <span>{data.user?.displayName}</span>
          <div className="userAvatar">
            <img src={data.user?.photoURL} className="userImg" alt="" />
          </div>
        </div>

        <div className="icons">
          <span className="icon">
            <MdCall />
          </span>
          <span className="icon">
            <FaVideo />
          </span>
          <span className="icon">
            <IoSettings />
          </span>
        </div>
      </nav>
      <div className="messageBox">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      </div>
      <Input />
    </div>
  );
};

export default ChatArea;
