import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useAuthContext();

  //function for logout from app
  const handleSignOut = async () => {
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { online: false, lastSeen: serverTimestamp()} );
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <h4 className="app-name">ConvoSycn</h4>
        <div className="profile__identity">{currentUser.displayName}</div>
      </div>
      <div className="navbar__right">
        <div className="profileImgWrapper">
          <img src={currentUser.photoURL} alt="" className="profileImg" />
        </div>
        <button className="logout__btn" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
