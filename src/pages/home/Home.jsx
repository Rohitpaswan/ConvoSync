import Sidebar from '../../components/sidebar/Sidebar'
import ChatArea from '../../components/chatArea/ChatArea'
import './home.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [preview, setPreview] = useState(true);
  const navigate = useNavigate();
 
  return (
    <div className='home'>
        <div className="container">
            <Sidebar />
        <ChatArea/>
        </div>
      
    </div>
  )
}

export default Home
