// Importing necessary dependencies and components
import { useContext, useState, useRef } from "react";
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
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import "./input.css";

const Input = () => {
  // Getting current user and chat data from context
  const currentUser = useAuthContext();
  const { data } = useContext(ChatContext);

  // State variables for text input, image, and emoji picker
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const textAreaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Function to handle sending messages
  const handleSend = async () => {
    if (text.trim() === "") return; // If text is empty, return

    try {
      let messageData = { // Prepare message data
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      };

      if (img) { // If image is present, upload image and update message data
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring if needed
          },
          (error) => {
            // Error handling
            console.error("Error uploading image:", error);
          },
          async () => {
            // Image upload complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            messageData.img = downloadURL;
            sendMessage(messageData); // Call sendMessage with updated message data
          }
        );
      } else {
        sendMessage(messageData); // Call sendMessage with message data
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error gracefully
    } finally {
      // Reset input fields
      setText("");
      setImg(null);
    }
  };

  // Function to send message
  const sendMessage = async (messageData) => {
    const chatDocRef = doc(db, "chats", data.chatId); // Reference to chat document

    await updateDoc(chatDocRef, { // Update messages array in chat document
      messages: arrayUnion(messageData),
    });

    // Update last message information for both users in the chat
    await Promise.all([
      updateLastMessage(currentUser.uid, data.chatId, messageData.text),
      updateLastMessage(data.user.uid, data.chatId, messageData.text),
    ]);
  };

  // Function to update last message information for a user in a chat
  const updateLastMessage = async (userId, chatId, text) => {
    await updateDoc(doc(db, "userchat", userId), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
  };

  // Function to handle key down events (e.g., pressing Enter to send message)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // If Enter key is pressed without Shift key
      e.preventDefault(); // Prevent default Enter behavior (line break)
      handleSend(); // Call handleSend to send message
    }
  };

  // Function to toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  // Function to handle emoji click
  const handleEmojiClick = (emojiObject) => {
    setText((prevMessage) => prevMessage + emojiObject.emoji); // Append emoji to text
  };

  // JSX rendering
  return (
    <div className="inputMessage">
      {showEmojiPicker && ( // Render emoji picker if showEmojiPicker is true
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div className="inputbox">
        <div className="left__icons">
          <BsEmojiSmile className="icon" onClick={toggleEmojiPicker} /> {/* Emoji picker icon */}
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])} // Set image file when selected
          />
          <label htmlFor="file">
            <img src={img} alt="" /> {/* Display selected image */}
          </label>
        </div>
        <div className="textbox">
          <textarea
              // Set the width to 60 characters
             rows={3}
            type="textarea"
            ref={textAreaRef}
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)} // Update text input
            value={text}
            onKeyDown={handleKeyDown} // Handle key down events
          />
        </div>
        <div></div> {/* Empty div for auto-scroll */}
      </div>
    </div>
  );
};

export default Input;
