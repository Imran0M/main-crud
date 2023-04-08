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
  id: yup.string().required('please fill the Id').min(2),
  name: yup.string().required('please fill your name').min(4),
  dob: yup.string().required('please your dob').max(10),
  age: yup.string().required('please fill your age').max(3)
})
function AddUser() {


  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      id: "",
      name: "",
      dob: "",
      age: "",
    },
    validationSchema: validationUser,
    onSubmit: (newUser) => {
      adding(newUser)
    }
  })

  const { user, setUser } = AppCont()

  const history = useHistory()
  // const [id, setId] = useState('')
  // const [name, setName] = useState('')
  // const [dob, setDob] = useState('')
  // const [age, setAge] = useState('')
  const adding = async (newUser) => {
    // const newUser = {
    //   id,
    //   name,
    //   dob,
    //   age
    // }
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
      <form onSubmit={handleSubmit} className="adduser-style container">

        <TextField label="Id" color="success" focused
          value={values.id}
          name="id"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.id && errors.id ? <p style={{ color: "crimson", fontSize: "8px", }}>{errors.id}</p> : ""}
        <TextField label="Name" color="success" focused
          value={values.name}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
           />
        {touched.name && errors.name ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.name}</p> : ""}
        <TextField label="Dob" color="success" focused
          value={values.dob}
          name="dob"
          onBlur={handleBlur}
          onChange={handleChange} 
          />
        {touched.dob && errors.dob ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.dob}</p> : ""}
        <TextField label="Age" color="success" focused
          value={values.age}
          name="age"
          onBlur={handleBlur}
          onChange={handleChange}
           />
        {touched.age && errors.age ? <p style={{ color: "crimson", fontSize: "8px" }}>{errors.age}</p> : ""}
        <Button type="submit" variant="contained" color="success" onClick={adding} >Add user</Button>
      </form>
    </Base>
  )
}

export default AddUser


