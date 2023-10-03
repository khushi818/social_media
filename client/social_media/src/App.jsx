import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./Pages/Homepage/HomePage"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"
import axios from 'axios'
import { useGlobalContext } from "./context/GlobalContext";

function App() {
  const {token} = useGlobalContext()
  axios.defaults.baseURL = 'http://localhost:8000/api/v1/';
  //  axios.defaults.baseURL = 'https://social-media-ahgu.onrender.com/api/v1/'
  axios.defaults.withCredentials = true
  
  const accessToken = JSON.parse(localStorage.getItem("token"))
  axios.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`}
  
  useEffect(()=>{
      if(token)
      { 
      localStorage.setItem('token' , JSON.stringify(token))      
      }  
   },[token])
  
   return (
     <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<p>route doesn't exists 404</p>}/>
      </Routes>
  )
}

export default App
