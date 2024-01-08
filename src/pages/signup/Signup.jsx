import "../../pages/login/login.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Navigate, Link } from "react-router-dom";
const Signup = () => {

  return (
    <>
      <section>
        <div className="wrapper">
          <form action="">
            <div>
              <h1 style={{fontSize: "22px"}}>Create a new Account</h1>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter User-name" />
              <FaCircleUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Enter Email" />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Enter password" />
              <IoMdLock className="icon" />
            </div>

            
            <div className="login-btn">
              <button>Sign Up</button>
            </div>
            <div className="register-link">
              <p>
                {" "}
                Have an account? <Link to='/login' className="sign-in" >Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
