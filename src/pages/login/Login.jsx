import { FaCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Mychatbot from "../../chatbot/Mychatbot";
import botDialogues from "../../utils/botDialogues.login.jsx";
import botAvatar from "../../assets/avatar.jpeg";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const[hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("successful");
      navigate("/");
    } catch (e) {
      // console.log(e);
      setError(true);
    }
  };
  return (
    <div className="signup">
      <div className="signup_conatiner">
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

              {hidePassword ? ( <FaEye  className="icon eye" onClick={() => setHidePassword(!hidePassword)}/> ) : 
              ( <FaEyeSlash  className="icon eye" onClick={() => setHidePassword(!hidePassword)} />)}
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
            {error && <span className="error">Email-Password Invalid</span>}
          </form>
        </div>
        <Mychatbot updatedSteps={botDialogues} botAvatar={botAvatar} />
      </div>
    </div>
  );
};

export default Login;
