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
  title: yup.string().required('Enter Title').min(2),
  author: yup.string().required('Enter Author').min(4),
  isbnNumber: yup.string().required('Enter ISBN Number').max(20),
  publicationDate: yup.string().required('Enter Date').max(20)
})
function AddUser() {

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      id: Math.random(),
      title: "",
      author: "",
      isbnNumber: "",
      publicationDate: "",
    },
    validationSchema: validationUser,
    onSubmit: (newUser) => {
      adding(newUser)
    }
  })

  const { user, setUser } = AppCont()
  const history = useHistory()
  // Add book api
  const adding = async (newUser) => {
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
      console.log("data not found")
    }


  }
  return (
    <Base tittle="Add User">
      <form onSubmit={handleSubmit} className="adduser-style container">

        <TextField label="Title" color="success" focused
          value={values.title}
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.title && errors.title ? <p style={{ color: "crimson", fontSize: "8px", }}>{errors.title}</p> : ""}
        <TextField label="Author" color="success" focused
          value={values.author}
          name="author"
          onBlur={handleBlur}
          onChange={handleChange}
           />
        {touched.author && errors.author ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.author}</p> : ""}
        <TextField label="ISBN Number" color="success" focused
          value={values.isbnNumber}
          name="isbnNumber"
          onBlur={handleBlur}
          onChange={handleChange} 
          />
        {touched.isbnNumber && errors.isbnNumber ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.isbnNumber}</p> : ""}
        <TextField label="Publication Date" color="success" focused
          value={values.publicationDate}
          name="publicationDate"
          onBlur={handleBlur}
          onChange={handleChange}
           />
            
        {touched.publicationDate && errors.publicationDate ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.publicationDate}</p> : ""}
        <Button type="submit" variant="contained" color="success" onClick={adding} >Add Book</Button>
      </form>
    </Base>
  )
}

export default AddUser


