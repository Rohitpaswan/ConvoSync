import "../../pages/login/login.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
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

  //Auth
  const signUpWithEmailAndPassword = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

     
        const storage = getStorage();
        const storageRef = ref(storage, `${username}_${new Date().getTime()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (e) => {
            // Handle unsuccessful uploads
            setError(true);
            console.log(e);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });
          }
        );

        console.log(user);
        alert("Success");
      
    } catch (error) {
      console.error(error);
      // Handle error
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
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
