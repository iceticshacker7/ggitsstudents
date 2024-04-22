import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import  {useEffect, useState } from 'react'
import axios from "axios"
import { GET_API_OPTIONS } from '../utils/constant';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Navbar = () => {
  const Navigate = useNavigate()
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

  const handleLogout = async()=>{
    Navigate('/logout')
  }
    


  return (
    <div className='flex justify-between text-lg p-3'>
<Breadcrumb>
  <BreadcrumbItem>
  <Link to='/'>
    <BreadcrumbSeparator  className='mx-5 my-5 text-lg'>Home</BreadcrumbSeparator>
    </Link>
  </BreadcrumbItem>

  <BreadcrumbItem>
  <Link to='/news'>
    <BreadcrumbSeparator  className='mx-5 my-5 text-lg'>News</BreadcrumbSeparator>
    </Link>
  </BreadcrumbItem>

  <BreadcrumbItem>
  <Link to='/leaderboard'>
    <BreadcrumbSeparator  className='mx-5 my-5 text-lg'>Leaderboard</BreadcrumbSeparator>
    </Link>
  </BreadcrumbItem>

  <BreadcrumbItem>
  <Link to='/jobs'>
    <BreadcrumbSeparator  className='mx-5 my-5 text-lg'>Jobs</BreadcrumbSeparator>
    </Link>
  </BreadcrumbItem>

  <BreadcrumbItem>
  <Link to='/resources'>
    <BreadcrumbSeparator  className='mx-5 my-5 text-lg'>Resources</BreadcrumbSeparator>
    </Link>
  </BreadcrumbItem>
  

</Breadcrumb>
{user!="" ? <button className='mx-5  text-lg' onClick={handleLogout}>Logout</button> : <button></button>}
</div>


  )
}

export default Navbar