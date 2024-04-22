import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const Login = () => {

  
  const navigate = useNavigate()
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value
    const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});
    api.post("http://localhost:5000/login",  {
      username,
      password,
    })
    .then((response)=>{
      if(response.data.role == "admin"){
        navigate('/admin')
      }
      else{
        alert(`login successfull: ${response.data.role}` )
        navigate('/')
      }
    }
      
    ).catch((error)=>{
      if(error.response.status == 401) {
        alert("wrong credentials")
        navigate('/')
      }
    })
  }

  return (
    <div>
      <Navbar/>
    <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
      <div className="mb-5">
        <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" required />
      </div>
      <div className="mb-5">
        <input type="password" id="password" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter your password' required />
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
    </form>


    </div>
  )
}

export default Login