import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditUser() {
  const {user, setUser}=AppCont()
    const history = useHistory('')
    const[idx ,setIdx]=useState('')
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
    const response = await fetch(`https://6421c7e934d6cd4ebd7bbdbe.mockapi.io/common/${id}`,{
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
         <TextField label="Id" color="success" focused
          value={id}
          onChange={(event) => setIdx(event.target.value)} />

        <TextField label="Name" color="success" focused
          value={name}
          onChange={(event) => setName(event.target.value)} />
        <TextField label="Dob" color="success" focused
          value={dob}
          onChange={(event) => setDob(event.target.value)} />
        <TextField label="Age" color="success" focused
          value={age}
          onChange={(event) => setAge(event.target.value)} />
      {/* <button className=""  >Update user</button> */}
      <Button onClick={updateUser} variant="contained" color="success">
 Update
</Button>
      </div>
    </Base>
  )
}

export default EditUser