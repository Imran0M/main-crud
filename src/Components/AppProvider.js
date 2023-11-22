import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';

const AppContext = createContext(null);
function AppProvider({ children }) {
  const [user, setUser] = useState([])
  const [author, setAuthor]= useState([])
  useEffect(() => {
    const getUser=async()=>{
      try {
          const response = await fetch("https://6421c7e934d6cd4ebd7bbdbe.mockapi.io/common",{
            method:"GET",
          })
          const data = await response.json()
          console.log(data)
          setUser(data)
          if(!data){
            console.log("data cound not fetch")
          }
        }
      catch (error) {
        console.log("data not found")
      }
      
    }
    getUser()

    const getAuthor=async()=>{
      try {
          const response = await fetch("https://655b477aab37729791a8d482.mockapi.io/crud/api",{
            method:"GET",
          })
          const data = await response.json()
          console.log(data)
          setAuthor(data)
          if(!data){
            console.log("data cound not fetch")
          }
        }
      catch (error) {
        console.log("data not found")
      }
      
    }
    getAuthor()


  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        author, 
        setAuthor
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppCont = () => {
  return useContext(AppContext)
}

export default AppProvider