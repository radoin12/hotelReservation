
import React from 'react';
import { useEffect } from "react";

import { createContext, useReducer } from "react";

const initialState={
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loadingUser:true,
    errorUser:null,
    deconectMsg:''
}

export const provideAuth=createContext(initialState)
const searchAuth=(state,action)=>{
    switch (action.type) {
        case "loadingPage":
          state.loadingUser=true  
            
       case "fullfieledToGetUser":
    
        return{
           user:action.payload,
           loadingUser:false
          }
        case "rejectedResponse":
          
        return{
            errorUser:action.payload,
            loadingUser:false
        }
        case "logout":
            return{
                user:null,
                deconectMsg:action.payload
            }
          
        default:
            return state
    }
}
export default function AuthuserProvider({children}) {
    const[state,dispatch]=useReducer(searchAuth,initialState)
    useEffect(()=>{
        if (state.user) {
            localStorage.setItem('user',JSON.stringify(state.user))  
        }
     
    },[state.user])
  return (<provideAuth.Provider value={
    {
        user:state.user,
        load:state.loadingUser,
        errorMsg:state.errorUser,
        disconect:state.deconectMsg,
        dispatch
    }
  }
  >{children}</provideAuth.Provider>)
}
