import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'

function EditUser() {
  const {user, setUser}=AppCont()
    const history = useHistory()
    const[idx ,setIdx]=useState()
    const [name , setName]=useState('')
    const [dob , setDob]= useState('')
    const [age , setAge]=useState('')
    const {id} =useParams()
    // console.log(id)
    const selectedUser =user.find((student)=>student.id === id)
    // console.log(selectedUser)
   useEffect(()=>{
    setIdx(selectedUser.id)
      setName(selectedUser.name)
      setDob(selectedUser.dob)
      setAge(selectedUser.age)
   },[])

   const updateUser=async()=>{
    const editedUser={
      id:idx,
       name,
       dob,
       age,
   }

  try {
    const response = await fetch(`https://642903155a40b82da4cb3c1b.mockapi.io/students/${id}`,{
      method:"PUT",
      body:JSON.stringify(editedUser),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    console.log(data)
    const getIndex=user.findIndex(stud=>stud.id ===id)
    console.log(getIndex)
    console.log(editedUser)
    user[getIndex]=data
    setUser([...user])
    history.push('/')

  } catch (error) {
    console.log("data not found")
  }
  
   }
  return (
    <Base tittle="Edit user">
         <div className="adduser-style container">
          <input placeholder="id"
          value={id}
          onChange={(event)=>setIdx(event.target.value)}/>
      <input 
      placeholder="Name"
      value={name}
      onChange={(event)=>setName(event.target.value)}
      />
      <input placeholder="Dob"
      value={dob}
      onChange={(event)=>setDob(event.target.value)}/>
      <input placeholder="Age"
      value={age}
      onChange={(event)=>setAge(event.target.value)}
      />
      <Button onClick={updateUser}className="adduser"  varient="dark">Update user</Button>
      </div>
    </Base>
  )
}

export default EditUser