
import './sidebar.css'
import Navbar from '../navbar/Navbar'
import Search from '../search/Search'
import Chats from '../chats/Chats'
import Mychatbot from '../../chatbot/Mychatbot'
import botAvatar from "../../assets/avatar2.jpeg"
import botDialogues from '../../utils/botDialogues.home.js'


const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="sidebar__wrapper">
    <Navbar/>
      <div className="sidebar__menu">
     
       <Mychatbot updatedSteps ={botDialogues} botAvatar ={botAvatar}/>
    
      <Search/>
      <Chats />
      </div>
    </div>
  </div>
  )
}

export default Sidebar
