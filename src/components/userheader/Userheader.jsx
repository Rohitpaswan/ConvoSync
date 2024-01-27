import "./userheader.css";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import "./userheader.css";
const Userheader = ({ userdata, avatar }) => {
  return (
    <div className="userheader">
      <div className="selectUser__name">
        <div className="userAvatar">
          <img src={avatar} className=" userAvatarImg" alt="" />
        </div>
        <span className="username">{userdata}</span>
      </div>
      <div className="icons">
        <span className="icon">
          <MdCall />
        </span>
        <span className="icon">
          <FaVideo />
        </span>
        <span className="icon">
          <IoSettings />
        </span>
      </div>
    </div>
  );
};

export default Userheader;
