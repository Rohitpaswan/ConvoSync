import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useAuthContext();
  console.log("uu" , currentUser);

  //function for logout from app
  const handleSignOut = async () => {
    try {
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
