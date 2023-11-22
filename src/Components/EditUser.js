import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditUser() {
  const { user, setUser } = AppCont()
  const history = useHistory('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbnNumber, setidbnNumber] = useState('')
  const [publicationDate, setPulicationDate] = useState('')

  const { id } = useParams()
  // console.log(id)
  useEffect(() => {
    const selectedUser = user.find((student) => student.id === id)
    // console.log(selectedUser)
    setTitle(selectedUser.title)
    setAuthor(selectedUser.author)
    setidbnNumber(selectedUser.isbnNumber)
    setPulicationDate(selectedUser.publicationDate)
  }, [id,user])
// Edit book api
  const updateUser = async () => {
    const editedUser = {
      title,
      author,
      isbnNumber,
      publicationDate
    }

    try {
      const response = await fetch(`https://6421c7e934d6cd4ebd7bbdbe.mockapi.io/common/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      const getIndex = user.findIndex(stud => stud.id === id)
      console.log(getIndex)
      console.log(editedUser)
      user[getIndex] = data
      setUser([...user])
      history.push('/')

    } catch (error) {
      console.log("data not found")
    }

  }
  return (
    <Base tittle="Edit user">
      <div className="adduser-style container">
        <TextField label="Title" color="success" focused
          value={title}
          onChange={(event) => setTitle(event.target.value)} />
        <TextField label="Author" color="success" focused
          value={author}
          onChange={(event) => setAuthor(event.target.value)} />
        <TextField label="ISB Number" color="success" focused
          value={isbnNumber}
          onChange={(event) => setidbnNumber(event.target.value)} />
        <TextField label="Pulication Date" color="success" focused 
          value={publicationDate}
          onChange={(event) => setPulicationDate(event.target.value)} />
        <Button onClick={updateUser} variant="contained" color="success">
          Update
        </Button>
      </div>
    </Base>
  )
}

export default EditUser