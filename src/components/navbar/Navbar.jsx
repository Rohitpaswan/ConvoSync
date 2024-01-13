import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useAuthContext();

  //function for logout from app
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } 
    catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="navbar">
      <div className="title">
        <span>Chat vive</span>
      </div>
      <div className="user">
        <div className="logo-img">
          <img src={currentUser.photoURl} alt="" />
        </div>
        <span className="user-name">{currentUser.displayName}</span>
        <div>
          <button className="logout-btn" onClick={handleSignOut}>
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
