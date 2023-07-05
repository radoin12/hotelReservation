import { useNavigate } from "react-router";
import "./searchItem.css";
import { provideAuth } from "../../hooks/context/authuser";
import { useContext } from "react";
import { contextProvider } from "../../hooks/context/reducer";

const SearchItem = ({data,options,dates,destination}) => {
  const{dispatch}=useContext(contextProvider)
  const navigate=useNavigate()
  return (
    <div className="searchItem" >
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{data.name} {data.types}</h1>
        <span className="siSubtitle">{data.city}</span>
        <span className="siDistance">{data.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {data.rate&&<div className="siRating">
          <span>Excellent</span>
          <button>{data?.rate}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${data.cheapsPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={()=>{navigate(`/hotels/${data._id}`)
               dispatch({type:'new action',payload:{destination, dates:[{startDate:new Date(dates[0].startDate.setDate(dates[0].startDate.getDate()+1))
                ,endDate:new Date(dates[0].endDate.setDate(dates[0].endDate.getDate()+1))
                
                }],options}})
        }}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
