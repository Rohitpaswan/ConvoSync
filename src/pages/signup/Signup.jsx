import "../../pages/login/login.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";  
import {auth ,storage, db} from "../../firebase"
import { ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore"
import "./signup.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signUpWithEmailAndPassword(email, password);
  };

  //Authecation function
  const signUpWithEmailAndPassword = async () => {
  
    try {
      const response = await createUserWithEmailAndPassword(auth,email, password); //create user

      // Create a unique image name
     const date = new Date().getTime();
     const storageRef = ref(storage, `${username + date}`);

     await uploadBytesResumable(storageRef, image);
     const downloadURL = await getDownloadURL(storageRef);
    
     // Update profile
     await updateProfile(response.user, {
      username,
      photoURL: downloadURL,
    });

    // Create user on firestore
    await setDoc(doc(db, "users", response.user.uid), {
      uid: response.user.uid,
      username,
      email,
      photoURL: downloadURL,
    });
    
      alert("Succes")
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <>
      <section>
        <div className="wrapper">
          <form action="" onSubmit={handelSubmit}>
            <div>
              <h1 style={{ fontSize: "22px" }}>Create a new Account</h1>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter User-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />
              <FaCircleUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <IoMdLock className="icon" />
            </div>

            <div className="img-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="image"
                id="uploadImg"
                style={{ display: "none" }}
              />
              <FcAddImage className="upload-img" />{" "}
              <label htmlFor="uploadImg">Add Your Avatar</label>
            </div>

            <div className="login-btn">
              <button>Sign Up</button>
            </div>
            <div className="register-link">
              <p>
                {" "}
                Have an account?{" "}
                <Link to="/login" className="sign-in">
                  Log in
                </Link>
              </p>
            </div>
            {error && <span>Something went wrong</span>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
