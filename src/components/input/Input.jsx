import { IoMdSend } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import './input.css'
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContextProvider";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
const Input = () => {
  const currentUser = useAuthContext();
  const { data } = useContext(ChatContext);
  console.log(data);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handelSend =async() =>{
    if(img){

    }
    else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userchat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userchat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);

  }
  return (
    <div className='inputMessage'>
      <div className="textbox">
        <input type="text" 
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}/>
      </div>

      <div className="text__icons">
        <IoMdSend onClick={handelSend}/>
        <MdOutlineFileUpload/>
        <BsEmojiSmile/>
        
      </div>
    

 
    </div>
  )
}

export default Input
