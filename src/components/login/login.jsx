

import React, { useContext, useState } from 'react';
import './login.css'
import { provideAuth } from '../../hooks/context/authuser';
import axios from 'axios';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
export default function Login() {
    const[credential,setCredential]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate()
    const {user,loadingUser,errorMsg,dispatch}=useContext(provideAuth)
    const userAuth=user&&jwtDecode(user)
  const changeValue=(e)=>{
    e.preventDefault()
    
    setCredential((prev)=>{
      return{
        ...prev,
        [e.target.id]:e.target.value
      }
    
    })

  }

   useEffect(()=>{
      if (userAuth?.id) {
        navigate('/')
      }
   },[userAuth?.id])

  const handlClick=async(e)=>{
   e.preventDefault()
   dispatch({type:'loadingPage'})
   try {
       
    const{data}=await axios.post('/api/login',credential,{withCredentials:true}) 
   
        dispatch({type:'fullfieledToGetUser',payload:data})  
       
        

 
   } catch (err) {
    dispatch({type:'rejectedResponse',payload:err.response.data.message})
  
   }
   
  }

  return (
    <div className='LoginContainer'>
      <form className='FormLogin'>
       <div className='LoginItem'>
       <label>email</label>
        <input type='email' id="email" onChange={(e)=>{changeValue(e)}}/>
       </div>
       <div className='LoginItem'>
       <label>password</label>
        <input type='text' id='password' onChange={(e)=>{changeValue(e)}} />
       </div>
       <button type='submit' className='btnClick'onClick={handlClick}>login</button>
      </form>
    </div>
  );
}
