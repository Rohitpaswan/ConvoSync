import { useState } from "react";
import { collection, query, where, getDocs,getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import {db} from "../../firebase"
import "./search.css";
import { useAuthContext } from "../../context/AuthContextProvider";


const Search = () => {
  
  const [serachUser, setSearchUser] = useState("");
  const[user, setUser] = useState(null);
  const [error, setError ] = useState(false);
  const currentUser  = useAuthContext();
  const handleKey =(e) =>{
  if(e.code ===  'Enter') handleSearch()

  }

  //function for searching user 
  const handleSearch = async () =>{
    try{
      const q = query(collection(db, "users"), where("username", "==",serachUser ));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data())
      });

      // if(user === null)  {
      // console.log('hh');
      // <div>User not exist</div>}
      console.log(user);
    }

    catch(e){
      setError(true);
      console.log(e);
    }

  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("res", res);
      // console.log('ok');
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log('oh');
      
         //create user chats
         const currentUserChatRef = doc(db, 'userchat', currentUser.uid);
         await updateDoc(currentUserChatRef, {
           [combinedId]: {
             userInfo: {
               uid: user.uid,
                displayName: user.username,
               photoURL: user.photoURL,
             },
             date: serverTimestamp(),
           },
         });
     
         // Update user chat document for the other user
         const otherUserChatRef = doc(db, 'userchat', user.uid);
         await updateDoc(otherUserChatRef, {
           [combinedId]: {
             userInfo: {
               uid: currentUser.uid,
               displayName: currentUser.displayName,
               photoURL: currentUser.photoURL,
             },
             date: serverTimestamp(),
           },
         });
        }
        console.log(currentUser, 'user' , user);
     
         console.log('User chat documents updated successfully');
       

       

    } catch (e) { console.log(e);}

    setUser(null);
    setSearchUser("")

  }
  
  return (
    <div className="serach">
      <div className="searchForm">
        <input type="text" placeholder="Find User" value={serachUser} onChange={(e) => setSearchUser(e.target.value)} onKeyDown={handleKey} />
      </div>
      {error && <span className="error">something went wrong</span>}
      { user && <div className="userChat" onClick={handleSelect}>
        <div className="userAvatar">
          <img
            src={user.photoURL}
            className="userImg"
            alt=""
          />
        </div>
        <div className="messageContent" >
          <span className="username">{user.username}</span>
        </div>
      </div>

      }
      
</div>
  );
};

export default Search;
