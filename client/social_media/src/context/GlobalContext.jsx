import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

const GlobalContext = createContext({
   isAuthenticated : false,
   setIsAuthenticated: (_val) =>{},
   showSucessToastMessage: (_message) =>{},
   showErrorToastMessage: (_message) =>{},
   openModal:false, setOpenModal: (_val) =>{},
   openEditProfile: false, setOpenEditProfile: (_val) =>{},
   openAddComment:false, setOpenAddComment: (_val) =>{},
   openAddPost:false, setOpenAddPost: (_val) =>{},
   openComment: false, setOpenComment: (_val) =>{},
   expandComment: false, setExpandComment: (_val) =>{},
   token: '',
   setToken:(val)=>{}
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [openEditProfile, setOpenEditProfile] = useState(false)
   const [openAddComment, setOpenAddComment] = useState(false)
   const [openAddPost, setOpenAddPost] = useState(false)
   const [openComment, setOpenComment] = useState(false)
   const [expandComment, setExpandComment] = useState(false)  
   const  [token, setToken] = useState('')

  

   const showSucessToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showErrorToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // useEffect(()=>{
  //    if(!openModal)
  //    {
  //     setOpenEditProfile(false)
  //     setOpenAddComment(false) 
  //     setOpenAddPost(false)
  //    } 
  //  },[openModal])

   const contextData ={
    isAuthenticated,
    setIsAuthenticated,
    showErrorToastMessage,
    showSucessToastMessage,
    openModal, setOpenModal,
   openEditProfile, setOpenEditProfile,
   openAddComment, setOpenAddComment,
   openAddPost, setOpenAddPost,
   openComment, setOpenComment,
   expandComment, setExpandComment,
   token,setToken
   }

   return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
}