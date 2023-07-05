import jwtDecode from "jwt-decode"
import "./navbar.css"
import { useContext } from "react"
import { provideAuth } from "../../hooks/context/authuser"
import axios from "axios"
import { useNavigate } from "react-router"

const Navbar = () => {
  const {user, disconect,dispatch}=useContext(provideAuth)
  const userAuth=user&&jwtDecode(user)
  console.log(disconect)
  const navigate=useNavigate()
  const Logout=async()=>{
   const {data}=await axios.post('/api/logout')
    dispatch({type:'logout',payload:data})
    localStorage.removeItem('user')
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">reservation Hotel</span>
        {!userAuth?.id?<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton"onClick={()=>navigate('/login')}>Login</button>
        </div>:
        <div className="navItems">
         <span >{userAuth?.name}</span>
         <button type="submit" className="navButton" onClick={ Logout}>Logout</button>
      </div>
        }
      </div>
    </div>
  )
}

export default Navbar