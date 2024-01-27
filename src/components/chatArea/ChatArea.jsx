import Message from "../message/Message";
import Input from "../input/Input";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Userheader from "../userheader/Userheader";
import './chatArea.css'


const ChatArea = () => {
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

 
  return (
    <div className="chatarea">
    <Userheader userdata = {data.user?.displayName} avatar = {data.user?.photoURL}/>
      <div className="message">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      </div>
      <Input />
    </div>
  );
};

export default ChatArea;
