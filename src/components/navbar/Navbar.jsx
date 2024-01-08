
import './navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="title">
        <span>Chat vive</span>
      </div>
      <div className="user">
        <div className='logo-img'>
            <img src="https://picsum.photos/200/300" alt=""  /></div>
        <span className='user-name'>Test User</span>
        <div> <button className='logout-btn'>Logout</button></div>
       
      </div>
    </div>
  )
}

export default Navbar
