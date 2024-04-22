import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'




const Logout = () => {
    const [isVerified, setIsVerified] = useState(false) 
    const Navigate = useNavigate()
    const verifyUser = async()=>{
        try {
            const data = await axios.get("http://localhost:5000/login" , {withCredentials: true})
            if(data.status == 200){
                setIsVerified(true)
            }
            return
        } catch (error) {
            if(error.response.status == 401){
                alert("User not looged in")
                Navigate('/')
                return
            }
        }  
    }
    const logoutUser = async()=>{
        try {
            const data = await axios.get("http://localhost:5000/login/logout", {withCredentials: true})
            if(data.status == 200){
                alert("Logged out seccuessfull")
                Navigate('/')
            }
        } catch (error) {
            console.log("Error occur while logging out")
        }  
    }

    useEffect(() => {
    verifyUser();
    logoutUser()
    
  }, []);

  return (
    <>
    <Navbar/>
    <div>Logout</div>
    </>
  )
}

export default Logout