import { useEffect } from "react";
import UsefetchData, { info } from "../../hooks/usefetch";
import "./featured.css";
import axios from "axios";
import { useState } from "react";
const Featured = () => {
const[property,setProperty]=useState({})
 

 const [loading,setLoading]=useState(true)
 console.log(property,"property")
    useEffect(()=>{
         const list=async()=>{
          setLoading(true)
          try {
            const{data}=await axios.get('/api/city?cityName=souse,mahdia,ainDrahem,touzer,tunis',{withCredentials:true}) 
          setProperty(data)
          setLoading(false)
          } catch (error) {
            
            console.log(error)
            setLoading(false)
          }
          
         }
         list()
    },[])
  return (
    <div className="featured">
       <>{
        loading?"is loading ....":
        <>
    
        <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt="tunis"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>sousse</h1>
          <h2>{property[0]}</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt="egypt"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>mahdia</h1>
          <h2>{property[1]}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt="france"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>ainDrahem</h1>
          <h2>{property[2]}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt="algerie"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>touzer</h1>
          <h2>{property[3]}</h2>
        </div>
      </div>
        <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt="morroco"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>tunis</h1>
          <h2>{property[4]}</h2>
        </div>
      </div>
      </>
      }
     
      </> 
    </div>
  );
};

export default Featured;
