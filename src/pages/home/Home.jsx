
import Sidebar from '../../components/sidebar/Sidebar'

import './home.css'

import ChatArea from '../../components/chatArea/ChatArea'


const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
        <ChatArea/>
        </div>
      
    </div>
  )
}

export default Home
