import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import "./input.css";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContextProvider";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";

const Input = () => {
  const currentUser = useAuthContext();
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSend = async (e) => {
    e.preventDefault();
    if (text === "") return;
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

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
    }
    setText("");
    setImg(null);
  };

  //handling emoji function
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiObject) => {
    setText((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="inputMessage">
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="inputbox">
        <div className="left__icons">
          <BsEmojiSmile className="icon" onClick={toggleEmojiPicker} />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={img} alt="" />
          </label>
        </div>
        <div className="textbox">
          <form action="" onSubmit={handleSend}>
            <textarea
              type="text"
              placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
        </div>
        <div className="sendbtn">
          <button onClick={handleSend}>
            <IoMdSend className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
