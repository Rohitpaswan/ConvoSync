import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import './login.css'
import { Link,useNavigate } from "react-router-dom";
import {auth} from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const Login = () => {
  const [email,setEmail] = useState('');
  const[password ,setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isVisible,setIsVisible] = useState(false);
  const handleNote =() =>{
    setIsVisible(!isVisible);
  }
  const navigate = useNavigate();
  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
   
      await signInWithEmailAndPassword(auth, email, password);
      alert('successful')    
      navigate('/')

    }
    catch(e) {
      // console.log(e);
      setError(true)
      
    }
   

  }
  return (
   <div className="signup">
   <div className="signup_conatiner">
    <div className="signup__wrapper">
      <form action="" onSubmit={handleLogin}>
        <div> <h1>Login </h1></div>
        <div className="input-box"><input type="email" placeholder="Enter Email" value ={email} onChange={(e) => setEmail(e.target.value)} />
        <FaCircleUser className="icon"/>
        </div>
        <div className="input-box"><input type="password" placeholder ="Enter password" value ={password} onChange={(e) => setPassword(e.target.value)} />
        <IoMdLock className="icon"/>
        </div>
        <div className="remeber-forgot">
         <a>Forgot Password</a></div>
         <div className="login-btn">
         <button>Login</button>
         </div>
       

        <div className="register-link">
          <p>Don't have an account? <Link to= '/signup' className="sign-in">Sign Up</Link> </p>
        </div>
        {error && <span className="error">Email-Password Invalid</span>}
      </form>
    </div>

   </div>
   <div className="note" >
    <CgNotes onClick={handleNote}/>
    {isVisible && (
        <div className="animated-div">
          <p>
          <b>Note:</b>  Demo Purpose<br />
          <i> <b>Use:</b><br />
          - user123@gmail.com,Password: user123<br />
          - user2123@gmail.com, Password: user123
          </i>
          </p>
        </div>
      )}
    </div>
   </div>
  );
};

export default Login;
