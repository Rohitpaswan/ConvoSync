import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import './login.css'
import { Link } from "react-router-dom";

const Login = () => {
  return (
   <>
   <section className=" ">
    <div className="wrapper">
      <form action="">
        <div> <h1>Login </h1></div>
        <div className="input-box"><input type="email" placeholder="Enter Email"/>
        <FaCircleUser className="icon"/>
        </div>
        <div className="input-box"><input type="password" placeholder ="Enter password" />
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
      </form>
    </div>
   </section>
   </>
  );
};

export default Login;
