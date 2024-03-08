import "./userheader.css";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import "./userheader.css";
import { useAuthContext } from "../../context/AuthContextProvider.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

const Userheader = ({ userdata, avatar }) => {
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const { data } = useContext(ChatContext);

  useEffect(() => {
    setUserId(data.user.uid)
  }, [data.user.uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const userDocRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDocumentData(userData);
          setStatus(userData.online); // Set status here
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchData();
  }, [userId, db]);

  // if (loading || documentData === null) {
  //   return <div>Loading...</div>; // Render loading state
  // }

  return (
    <div className="userheader">
      
      <div className="selectUser__name">
        <div className="userAvatar">
          <img src={avatar} className=" userAvatarImg" alt="" />
        </div>
        <div className="info">
        <span className="username">{userdata}</span>
        {status ? <span className="status"> Online</span> : <span className="status">Offline</span>}
       
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
    </div>
  );
};

export default Userheader;
