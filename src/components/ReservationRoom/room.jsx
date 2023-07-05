
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { contextProvider } from '../../hooks/context/reducer';
import './room.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { provideAuth } from '../../hooks/context/authuser';
import jwtDecode from 'jwt-decode';


export default function RoomReservation({id,setOpen}) {
   const{info}=useContext(contextProvider)
   const[hotel,setHotel]=useState("")
   const[load,setLoad]=useState(true)
   const[error,setError]=useState(null)
   const[roomsFilter,setRoomsFilter]=useState([])
   const[loadingRoom,setLoadingRoom]=useState('')
   const[roomId,setRoomId]=useState([])
   const [arrayIdRoomsChecked,setArrayIdRoomsChecked]=useState([])

    const{user}=useContext(provideAuth)
    const decodeUser=user&&jwtDecode(user)

   

   useEffect(()=>{
     const fetchOneHotel=async()=>{
      setLoad(true)
      try {
        const{data}=await axios.get(`/api/hotel/${id}`) 
        setLoad(false)
        setHotel(data)
      } catch (error) {
        setLoad(false)
         setError(error.response)
      }
      

     }
     fetchOneHotel()
   },[])
   
  
  const handleChange=(e)=>{

    const cheked=e.target.checked
    const val=e.target.value
    const id=e.target.id
   
    setRoomId(cheked?([...roomId,val]):roomId.filter((item)=>item!==val))
    setArrayIdRoomsChecked(cheked?[...arrayIdRoomsChecked,{id:id,num:val}]:arrayIdRoomsChecked.filter((item)=>item.num!==val))
  }
 
   const getIdrooms=[]
   arrayIdRoomsChecked.map((item)=>{
    getIdrooms.push(item.id)
   })
  console.log(getIdrooms&&getIdrooms[0])
   useEffect(()=>{
    const fetchRoomId=async()=>{
         setLoadingRoom(true)
         try {
          setLoadingRoom(false)
           const {data}=await axios.get(`/api/roomsId?q=${getIdrooms}`)
           setRoomsFilter(data)
         } catch (error) {
          setLoadingRoom(false)
            console.log(error)
         }
    }
    fetchRoomId()
     },[arrayIdRoomsChecked])
     
   console.log(hotel,"filter")
     

     
         const availbleRoom=(start,end)=>{
           let  startNewDate=new Date(start)
           let endOfDate=new Date(end)
          let  dates=new Date(startNewDate)
           const AllDate=[]
           while(dates<=endOfDate){
             AllDate.push(new Date(dates).getTime())
             dates.setDate(dates?.getDate()+1)
           }
           return AllDate
         }
       const getDays=availbleRoom((info.dates[0].startDate),(info.dates[0].endDate))
     
       const order={
        hotel:{
          name:hotel?.name,
          desc:hotel?.desc,
          distance:hotel?.distance,
          city:hotel?.city,
          photo:hotel&&hotel?.photo[0]

        },
        user:decodeUser?.id,
        id:decodeUser?.id,
        rooms: roomsFilter?.map((item)=>
        {
          return{
         name:item.name,
         desc:item.desc,
         price:item.price,
         maxPeople:item.maxPeople,
         total: getDays.length*item.price,
         roomsNumber: item.roomsNumber?.filter((item)=>roomId.indexOf(item._id)!==-1).map((num)=>{
         return {
          number:num?.number?.num,
          avaibleDate:getDays
        
        }
        })} })}
      
    
        
        console.log(getDays,'dayyys')
           const FetchDateRoom=async(e)=>{
             e.preventDefault()
              try {
                const res=await axios.post('/api/create/orders',order,{withCredentials:true})
                console.log(res.data,"data order")
                const{data}= await axios.put(`/api/availbleRoom?q=${roomId}`,{avaibleDate:getDays},{withCredentials:true})  
               
                
                console.log(data)
                setOpen(false)
              } catch (error) {
                console.log(error)
              }
          }
      

    





    
     
      
     const availble=(room)=>{
    
       const y=room?.avaibleDate?.some((data)=>{
    
            
            return    getDays?.includes(new Date(data).getTime())
       })
      
         return y
     }



  return (
    <div>
      {
      load?<p>...loading</p>:error?<p>oops connection is failed</p>:
     
      <div className='reseve'>
      <div className='container'>
        <FontAwesomeIcon
         className='iconeX'
         icon={faCircleXmark}
         onClick={()=>setOpen(false)}
  
        />
   
        <span className='selectItem'>select your room</span>
           
          {hotel?.rooms?.map((item,i)=>
             <div className='item' key={i}>
              
             <div className='itemInfo' >
               <div className='titleHotel'>name: {item?.name}</div>
               <div className='deschotel'>description:{item?.desc}</div>
               <div className='price'>price:${item?.price} </div>
               <div className='maxpeople'>max people:{item?.maxPeople}</div>
              
               {item.roomsNumber.map((numbers,i)=>
               
               <div className='roomNumber' key={i}>
            
                     <div className='itemRoom'>
                       <div>num{numbers?.number.num}</div>
                       <input type='checkbox' className='check' value={numbers?._id} id={item._id}
                     onChange={(e)=>{handleChange(e)}
                    
                    }
                    
                    disabled={availble(numbers?.number)}
                     />
                      
                  
                     
                </div>
              
               </div>
               
               
               )
               
               
               }
              
                 <span className='spanLigne'></span>
             </div>
           
           </div>
          )}
          
          <button className='reserveBtn' onClick={(e)=>{FetchDateRoom(e)}}>reserve now</button>
       </div>
      
      </div>
    }
   
      
      
      
    </div>
    
  );
}
