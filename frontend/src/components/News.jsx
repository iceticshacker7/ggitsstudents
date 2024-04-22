import React, { useState, useEffect } from 'react'
import { Navigate, json, useNavigate } from 'react-router-dom';
import axios from "axios"
import Navbar from './Navbar';
import Card from "./helper/Cards"
import { Button } from '@chakra-ui/react';

const News = () => {
      const [user, setUser] = useState("");
      const [news, setNews] = useState([])
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
            if(data.data.role=="admin" || data.data.role == "news"){
              setUser(data.data.role)
            }
            return
        } catch (error) {
            return
        }
      }

  const getNews = async()=>{
    try {
      const data = await api.get("http://localhost:5000/news")
      setNews([...data.data])
      console.log(news)
    } catch (error) {
      console.log("error fetching news")
    }
  }

  useEffect(()=>{
    getUserData();
    getNews()
  }, [])
  return (
    <>
    <Navbar/>
    <div className='flex px-1 h-10  w-full justify-end'>
    {user == "admin" || user=="news" ? <Button  className='bg-green-100 text-md font-bold rounded-lg border border-black round-lg p-3 '>New News</Button>: <Button></Button>} 
    </div>
    {news.map((newss)=>{
      return(
        <>
        <Card title={newss.title} descrition={newss.description} tag={newss.tag} link={newss.link}/>
        <div className='flex justify-end p-0 m-0'>
        {user == "admin" || user=="news" ? <Button  className='bg-blue-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1'>Edit</Button>: <Button></Button>} 
        {user == "admin" || user=="news" ? <Button className='bg-red-300 border border-black rounded-lg w-20 font-bold mx-3 p-1 my-1 right-0' >Delete</Button>: <Button></Button>} 
        </div>
    </>
      )
    })}
    
    </>
  )
}

export default News