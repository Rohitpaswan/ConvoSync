
import './sidebar.css'
import Navbar from '../navbar/Navbar'
import Search from '../search/Search'
import Chats from '../chats/Chats'


const Sidebar = () => {
  return (
    <div className='sidebar'>
    <div className="sidebar__wrapper">
    <Navbar/>
      <div className="sidebar__menu">
      <Search/>
      <Chats />
      </div>
    </div>
  </div>
  )
}

export default Sidebar
