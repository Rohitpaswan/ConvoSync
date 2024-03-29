import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./search.css";
import { useAuthContext } from "../../context/AuthContextProvider";

const Search = () => {
  const [serachUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const currentUser = useAuthContext();
  const handleKey = (e) => {
    e.preventDefault();

    handleSearch();
  };

  // function for searching user
  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", serachUser)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

      if (querySnapshot.empty) alert("No user found");
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      // console.log('ok');
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        const currentUserChatRef = doc(db, "userchat", currentUser.uid);
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
        const otherUserChatRef = doc(db, "userchat", user.uid);
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
      // console.log(currentUser, "user", user);
      console.log("User chat documents updated successfully");
    } catch (e) {
      console.log(e);
    }

    setUser(null);
    setSearchUser("");
  };

  return (
    <div className="serach">
      <form action="" onSubmit={handleKey}>
        <div className="searchForm">
          <CiSearch className="search__icons" />
          <input
            type="text"
            placeholder="Search or Start chat"
            className="search__input"
            value={serachUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
      </form>

      {error && <span className="error">something went wrong</span>}
      {user && (
        <div className="userchat" onClick={handleSelect}>
          <div className="userAvatar">
            <img src={user.photoURL} className="userAvatarImg" alt="" />
          </div>
          <div className="messageContent">
            <span className="username">{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

