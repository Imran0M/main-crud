// import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Base from './Base'
import { AppCont } from './AppProvider'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup'

//formik validation
const validationUser = yup.object({
  authorName: yup.string().required('Enter Author Name').min(4),
  birthDate: yup.string().required('Enter Birth Date').max(20),
  shortBio: yup.string().required('Enter Short Bio').max(32)
})
function AddAuthor() {

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
     authorName: "",
     birthDate: "",
     shortBio: "",
    },
    validationSchema: validationUser,
    onSubmit: (newUser) => {
      adding(newUser)
    }
  })

  const { user, setUser } = AppCont()
  const history = useHistory()

  // Post author api
  const adding = async (newUser) => {
    try {
      const response = await fetch("https://655b477aab37729791a8d482.mockapi.io/crud/api", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      setUser([...user, data])
      history.push('/author/page')
    } catch (error) {
      console.log("data not found")
    }


  }
  return (
    <Base tittle="Add Author Detail">
      <form onSubmit={handleSubmit} className="adduser-style container">

        <TextField label="Author Name" color="success" focused
          value={values.authorName}
          name="authorName"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.authorName && errors.authorName ? <p style={{ color: "crimson", fontSize: "8px", }}>{errors.authorName}</p> : ""}
        <TextField label="Birth Date" color="success" focused
          value={values.birthDate}
          name="birthDate"
          onBlur={handleBlur}
          onChange={handleChange}
           />
        {touched.birthDate && errors.birthDate ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.birthDate}</p> : ""}
        <TextField label="Short Bio" color="success" focused
          value={values.shortBio}
          name="shortBio"
          onBlur={handleBlur}
          onChange={handleChange} 
          />
        {touched.shortBio && errors.shortBio ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.shortBio}</p> : ""}
        <Button type="submit" variant="contained" color="success" onClick={adding} >Add</Button>
      </form>
    </Base>
  )
}

export default AddAuthor


