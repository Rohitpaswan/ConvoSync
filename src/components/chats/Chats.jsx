import { useContext, useEffect, useState } from 'react'
import './chats.css'
import { useAuthContext } from '../../context/AuthContextProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';
const Chats = () => {
  const [chats,setChats ] = useState({});
  const currentUser = useAuthContext();
  const {dispatch} = useContext(ChatContext)
  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db, "userchat" , currentUser.uid) ,(doc) =>{
        setChats(doc.data())
      })
    
    return() =>{
      unsub()
      }
    }
    if(currentUser.uid) getChats();
  
  } ,[currentUser.uid])

  const handleSelect = (u) => {
     dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(chats);
  return (
    <div className='chats'>
       {
        Object.entries(chats)?.map((chat ) =>{
          return(
            <div className="userChat" key={chat[0]}   onClick={() => handleSelect(chat[1].userInfo)}>     
            <div className="userAvatar">
              <img
                src={chat[1].userInfo.photoURL}
                className="userImg"
                alt=""
              />
            </div>
            <div className="messageContent" >
            <span className="username">{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
              </div>
           

        </div>
          ) 
        })
       }

    </div>
  )
}

export default Chats
