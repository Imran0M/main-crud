import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddUser() {
  const { user, setUser } = AppCont()

  const history = useHistory()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [age, setAge] = useState('')
  const adding = async () => {
    const newUser = {
      id,
      name,
      dob,
      age
    }
    try {
      const response = await fetch("https://6421c7e934d6cd4ebd7bbdbe.mockapi.io/common", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      setUser([...user, data])
      history.push('/')
    } catch (error) {
      console.log("data notfound")
    }


  }
  return (
    <Base tittle="Add User">
      <div className="adduser-style container">

        <TextField label="Id" color="success" focused
          value={id}
          onChange={(event) => setId(event.target.value)} />

        <TextField label="Name" color="success" focused
          value={name}
          onChange={(event) => setName(event.target.value)} />
        <TextField label="Dob" color="success" focused
          value={dob}
          onChange={(event) => setDob(event.target.value)} />
        <TextField label="Age" color="success" focused
          value={age}
          onChange={(event) => setAge(event.target.value)} />
        <Button  variant="contained" color="success" onClick={adding} >Add user</Button>
        
      </div>
    </Base>
  )
}

export default AddUser