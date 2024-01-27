import Sidebar from "../../components/sidebar/Sidebar";
import ChatArea from "../../components/chatArea/ChatArea";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Home;
