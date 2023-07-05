import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from 'axios'
import UsefetchData from "../../hooks/usefetch";
import { useContext } from "react";
import { contextProvider } from "../../hooks/context/reducer";
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const[load,setLoad]=useState(true)
  const[hotel,setHotel]=useState(undefined)
  const[min,setMin]=useState(undefined)
  const[maxi,setMaxi]=useState(undefined)
  const{reftechData}=UsefetchData()
  const{dispatch}=useContext(contextProvider)
  
  useEffect(()=>{
     const HotelDetails=async()=>{
      try {
        const{data}=await axios.get(`/api/finddetails?city=${destination||''},${min||1},${maxi+1||900}`)
        setHotel(data)
      } catch (error) {
        console.log(error)
      }
       
        
     } 
     HotelDetails()
  },[destination,min,maxi])

  const searchItem=async()=>{

      try {
        const{data}=await axios.get(`/api/finddetails?city=${destination},${(min)|1},${maxi|900}`)
        setHotel(data)
      } catch (error) {
        console.log(error)
      }
       
        
     
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" 
               onChange={(e)=>{
                e.preventDefault()    
                setDestination(e.target.value)
              }}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput"
                   onChange={(e)=>{
                    e.preventDefault()    
                    setMin(parseInt(e.target.value))
                  }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput"
                   onChange={(e)=>{
                    e.preventDefault()    
                    setMaxi(parseInt(e.target.value))
                  }}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                   
                  />
                </div>
              </div>
            </div>
            <button type="submit" onClick={searchItem}>Search</button>
          </div>
          <div className="listResult">
            {
              hotel&&hotel.map((item,i)=>
              <SearchItem data={item} key={i}options={options} dates={dates} destination={destination} />
              )
            }
            
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
