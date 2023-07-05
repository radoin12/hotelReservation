import { useState } from "react";
import UsefetchData from "../../hooks/usefetch";
import "./featuredProperties.css";
import { useEffect } from "react";
import axios from 'axios'
const FeaturedProperties = () => {
  
  const[property,setProperty]=useState({})
 

  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  console.log(property,"property")
     useEffect(()=>{
          const list=async()=>{
           setLoading(true)
           try {
             const{data}=await axios.get(`/api/featureHotel?features=${true}&limit=4`) 
           setProperty(data)
           setLoading(false)
           } catch (error) {
              setError(error)
             console.log(error)
             setLoading(false)
           }
           
          }
          list()
     },[])
  const images=[
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
  ]
  return (
    <div className="fp">
      {
        loading?<p>..loading</p>:error?<p>check your connection</p>:
          property&&property?.map((item,i)=>
          <div className="fpItem" key={i||0}>
          <img
            src={images[i]}
            alt={item?.name}
            className="fpImg"
          />
          <span className="fpName">{item?.name}</span>
          <span className="fpCity">{item?.city}</span>
          <span className="fpPrice">Starting from ${item.cheapsPrice}</span>
          <div className="fpRating">
            
           { item?.rate&&
           <>
            <button>{item?.rate}</button>
            <span>Excellent</span>
           </>
          
            }
            
          </div>
        </div>
          
          )
      }
   
      
     
    </div>
  );
};

export default FeaturedProperties;
