
import './App.css'

import Home from './pages/home/Home'
import{Route,Routes} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

function App() {


  return (
    <>
    <Routes>
      <Route path='/'>
      <Route index element={<Home/>}/>
      <Route path='Signup' element={<Signup/>}/>
      <Route path='login' element={<Login/>}/>
      
      </Route>
    
    </Routes>

    </>
  )
}

export default App
