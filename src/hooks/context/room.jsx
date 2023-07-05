import { useReducer } from "react";
import { createContext } from "react";
import React from 'react';

const initialState={
    rooms:[],
    load:true,
    errorRoom:null,

    updateRoomEroor:null,
    loadUpdateRoom:true,

    findOneRoomEroor:null,
    loadFindone:true,

    deleteloadRoom:true,

    createRoomError:null,
    loadCreateRomm:true
  
}

export const roomProvider=createContext(initialState)
 const ReducerRomm=(state,action)=>{
  switch (action.type) {
    case "loadingPageCreateRoom":
        return{
        
         loadCreateRomm:true
        }  
       
    case "createRoom":
       return{
        rooms:state.rooms?.push(action.payload),
        loadCreateRomm:false
       }  
       case "ErrorRequestCreateRoom":
        return{
         loadCreateRomm:false ,
         createRoomError:action.payload
        }  

        // methode request get room
        case "loadingPagegetRoom":
            return{
             load:true,
          
            }  
           
        case "findRooms":
           return{
            rooms:action.payload,
            load:false
           }  
           case "errorRequestRoomFind":
            return{
             load:false ,
             errorRoom:action.payload
            }  
      
  
    default:
        return state
  }
 }


export default function RoomsProvider({children}) {
    const[state,dispatch]=useReducer(ReducerRomm,initialState)
  return (
    <roomProvider.Provider
     value={{
        rooms:state.rooms,
        loadingPageRoom:state.load ,
        errorRoom:state.errorRoom ,
        loadingCreateRoom:state.loadCreateRomm,
        createRoomError:state.createRoomError,
        dispatch

     }}
    >{children}</roomProvider.Provider>
  );
}

