import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../firebase"
import "./search.css";

const Search = () => {
  
  const [serachUser, setSearchUser] = useState();
  const[user, setUser] = useState(null);
  const [error, setError ] = useState(false)
  const handelKey =(e) =>{
  if(e.code ===  'Enter') handelSearch()

  }

  //function for searching user 
  const handelSearch = async () =>{
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

  const handelchat = () =>{
    //check group exist

    //create user chat (chats collection in firebase)
    
  }
  
  return (
    <div className="serach">
      <div className="searchForm">
        <input type="text" placeholder="Find User" onChange={(e) => setSearchUser(e.target.value)} onKeyDown={handelKey} />
      </div>
      {error && <span className="error">something went wrong</span>}
      { user && <div className="userChat" onClick={handelchat}>
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
