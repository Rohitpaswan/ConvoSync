import "../../pages/login/login.css";
import { FaCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import botDialogues from "../../utils/botDialogues.login.js";
import botAvatar from "../../assets/avatar.jpeg";
import Mychatbot from "../../chatbot/Mychatbot";
import { InfinitySpin } from "react-loader-spinner";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signUpWithEmailAndPassword();
  };

  const signUpWithEmailAndPassword = async () => {
    try {
      setLoader(true);
      setError(false);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);
      await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(response.user, {
        displayName: username,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        username,
        email,
        photoURL: downloadURL,
      });
      await setDoc(doc(db, "userchat", response.user.uid), {});
      navigate("/");
    } catch (e) {
      setError(true);
      setErrorMessage(e.code);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    e.target.value = "";
  };

  return (
    <div className="signup">
      <div className="signup_conatiner">
        {loader && !error && (
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
                Have an account?
                <Link to="/login" className="sign-in">
                  Log in
                </Link>
              </p>
            </div>
            {error && <span className="error">{errorMessage}</span>}
          </form>
        </div>
        <Mychatbot updatedSteps={botDialogues} botAvatar={botAvatar} />
      </div>
    </div>
  );
};

export default Signup;
