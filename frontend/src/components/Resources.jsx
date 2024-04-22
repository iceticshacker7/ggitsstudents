import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"
import Navbar from './Navbar';
const Resources = () => {

        const [user, setUser] = useState("");
  const Navigate = useNavigate()
  const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});
  const getUserData = async () => {
        try {
            const data = await api.get("http://localhost:5000/login")
            if(data.data.role=="admin" || data.data.role == "resources"){
              setUser(data.data.role)
            }
            return
        } catch (error) {
            return
        }
      }

  useEffect(()=>{
    getUserData();
  }, [])
  
  return (<>
  
    <Navbar/>
    {user=="admin" || user=="resources" ? <h1>resources page for {user} role </h1> : <h1>resources page</h1>}
    </>
  )
}

export default Resources