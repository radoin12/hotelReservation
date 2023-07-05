import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react"




const UsefetchData=(url)=>{
    const[dataFetching,setDataFetching]=useState({})
    const[loading,setLoading]=useState(null)
    const[errorMsg,setErrorMsg]=useState(undefined)
  

    useEffect(() => {
        const fetchData=async() => {
            setLoading(true)
            try {
                const{data}=await axios.get(url) 
                console.log(data)
                setDataFetching(data) 
                setLoading(false)
            } catch (error) {
                setErrorMsg(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [url]);

   const reftechData=async(url)=>{
    setLoading(true)
    try {
        const{data}=await axios.get(url)  
        setDataFetching(data)
        setLoading(false)
    } catch (error) {
        console.log(error,"error")
        setErrorMsg(error)
        setLoading(true)
    }
        

   };


    return {dataFetching,loading,errorMsg,reftechData}

}

export default UsefetchData