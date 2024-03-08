import { FaCircleUser} from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Mychatbot from "../../chatbot/Mychatbot";
import botDialogues from "../../utils/botDialogues.login.js";
import botAvatar from "../../assets/avatar.jpeg";
import "./login.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContextProvider.jsx";
import {InfinitySpin} from "react-loader-spinner"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const currentUser = useAuthContext();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      setError(false)
      await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", currentUser.uid);
      // console.log("user", userDocRef);
      await setDoc(
        userDocRef,
        { online: true, lastSeen: serverTimestamp() },
        { merge: true }
      );
      
      navigate("/");
    } catch (e) {
      // console.log(e);
      setError(true);
      
    
    } finally {
      // Check if navigation occurred
      if (!navigate) {
        setLoading(false);
        // Set loading to false only if navigation didn't occur
      }
    }
  };
  
  

  return (
    <div className="signup">
      <div className="signup_conatiner">
      {loading && !error && (
          <div className="loading-overlay">
            <InfinitySpin
              visible={true}
              width="200"
              color="#211551"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        )}
        <div className="signup__wrapper">
            <form action="" onSubmit={handleLogin}>
            <div>
              {" "}
              <h1>Login </h1>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaCircleUser className="icon" />
            </div>
            <div className="input-box">
              <input
                className="password"
                type={hidePassword ? "password" : "text"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />

              {hidePassword ? (
                <FaEye
                  className="icon eye"
                  onClick={() => setHidePassword(!hidePassword)}
                />
              ) : (
                <FaEyeSlash
                  className="icon eye"
                  onClick={() => setHidePassword(!hidePassword)}
                />
              )}
            </div>
            <div className="remeber-forgot">
              <a>Forgot Password ?</a>
            </div>
            <div className="login-btn">
              <button>Login</button>
            </div>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="sign-in">
                  Sign Up
                </Link>{" "}
              </p>
            </div>
            {error && <span className="error">Email-Password Invalid</span> }
          </form>
   
        </div>
        <Mychatbot updatedSteps={botDialogues} botAvatar={botAvatar} />
      </div>
    </div>
  );
};

export default Login;
