import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditAuthor() {
  const { author , setAuthor } = AppCont()
  const history = useHistory('')
  const [authorName, setAuthorName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [shortBio, setShortBio] = useState('')

  const { id } = useParams()
  // console.log(id)
  useEffect(() => {
    const selectedUser = author.find((author) => author.id === id)
    // console.log(selectedUser)
    setAuthorName(selectedUser.authorName)
    setBirthDate(selectedUser.birthDate)
    setShortBio(selectedUser.shortBio)
  }, [id,author])
// Edit api author
  const updateUser = async () => {
    const editedUser = {
    authorName,
    birthDate,
    shortBio,
    }

    try {
      const response = await fetch(`https://655b477aab37729791a8d482.mockapi.io/crud/api/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      const getIndex = author.findIndex(stud => stud.id === id)
      console.log(getIndex)
      console.log(editedUser)
      author[getIndex] = data
      setAuthor([...author])
      history.push('/author/page')

    } catch (error) {
      console.log("data not found")
    }

  }
  return (
    <Base tittle="Edit user">
      <div className="adduser-style container">
        <TextField label="Author Name" color="success" focused
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)} />
        <TextField label="Birth Date" color="success" focused
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)} />
        <TextField label="Short Bio" color="success" focused 
          value={shortBio}
          onChange={(event) => setShortBio(event.target.value)} />
        <Button onClick={updateUser} variant="contained" color="success">
          Update
        </Button>
      </div>
    </Base>
  )
}

export default EditAuthor