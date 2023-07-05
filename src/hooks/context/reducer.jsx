import { useEffect } from "react"

const { createContext, useReducer } = require("react")

const initialState={
    info:localStorage.getItem('info')?JSON.parse(localStorage.getItem('info')):null
}
export const contextProvider=createContext(initialState)
const searchAction=(state,action)=>{
    switch (action.type) {
        case "new action":
     
            return {
                info:action.payload
            }
            
         case "reset":
          return initialState
        default:
            return state;
    }
}


export default function ReducerHotelProvider({children}) {
    const[state,dispatch]=useReducer(searchAction,initialState)
    useEffect(()=>{
        if (state.info) {
            localStorage.setItem('info',JSON.stringify(state.info))  
        }
    
    },[state.info])
  return (
    <contextProvider.Provider value={{
        info:state.info ,
    
         dispatch
    
    }
    }>{children}</contextProvider.Provider>
  );
}
