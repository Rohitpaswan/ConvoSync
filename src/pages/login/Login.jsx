import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import './login.css'
import { Link,useNavigate } from "react-router-dom";
import {auth} from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const Login = () => {
  const [email,setEmail] = useState('');
  const[password ,setPassword] = useState('');
  const [error, setError] = useState(false);
  

  const navigate = useNavigate();
  const handelLogin = async(e) =>{
    e.preventDefault();
    try{
   
      await signInWithEmailAndPassword(auth, email, password);
      alert('scuesss')    
      navigate('/')

    }
    catch(e) {
      // console.log(e);
      setError(true)
      
    }
   

  }
  return (
   <>
   <section className=" ">
    <div className="wrapper">
      <form action="" onSubmit={handelLogin}>
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
   </section>
   </>
  );
};

export default Login;
