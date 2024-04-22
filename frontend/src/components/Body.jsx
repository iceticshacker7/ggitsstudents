import React, { useEffect, useState } from 'react'
import axios from "axios"
import { GET_API_OPTIONS } from '../utils/constant';
import Navbar from './Navbar';

const Body = () => {
  const [user, setUser] = useState("");
  const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});
  const getUserData = async () => {
        try {
            const data = await api.get("http://localhost:5000/login")
            setUser(data.data.role);
            return
        } catch (error) {
          // console.log(error)
            return
        }
      }

  useEffect(()=>{
    getUserData();
  }, [])

  return (
    <>
    <Navbar/>
    {user=="" ? <h1>MAIN HOME PAGE</h1> : <h1>Verified user logged in {user}</h1>}
    </>
  )
}

export default Body