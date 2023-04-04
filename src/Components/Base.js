import React from 'react'
import { useHistory } from 'react-router-dom';


function Base({tittle, children}) {
    const history=useHistory();
  return (
    <div className="App">
        <div className='nav'>
        <button  onClick={()=>history.push('/add/user')}className="btnn" >Add User</button>
        <button  onClick={()=>history.push('/')} className="btnn" >User Details</button>
        </div>
        <h2 style={{marginTop:"10px"}}>{tittle}</h2>
        <div>{children}</div>
    </div>
  )
}

export default Base;