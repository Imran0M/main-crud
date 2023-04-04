import Base from './Base'
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { AppCont } from './AppProvider';

function UserPage() {

  const { user, setUser } = AppCont()
  const deleteUser = async (idx) => {
    try {
      const response = await fetch(`https://6421c7e934d6cd4ebd7bbdbe.mockapi.io/common/${idx}`,{
        method:"Delete",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      setUser(data)
      if (!data){
        console.log("data nor fetching")
      }
    } catch (error) {
      console.log("Data not found")
    }
    const deletedUser = user.filter((student) => student.id !== idx)
    setUser(deletedUser)
  }
  const history = useHistory()

  return (
    <Base
      tittle="USER DETAILS">
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th className="col-3">Name</th>
              <th className="col-3" >DOB </th>
              <th className="col-3">AGE</th>
              <th className="col-3">Operation</th>
            </tr>
          </thead>
        </Table>
        {user.map((student, id) => (
          <div key={id}>
            <Table >
              <tbody>
                <tr>
                  <td className="col-3">{student.name}</td>
                  <td className="col-3">{student.dob}</td>
                  <td className="col-3">{student.age}</td>
                  <td className="col-3">
                    <div>
                      
                      <button onClick={() => history.push(`edit/${student.id}`)} className="edit-btn" >Edit </button>{' '}
                      <button onClick={() => deleteUser(student.id)} className="delete-btn"> Delete </button>{' '}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

          </div>

        ))}
      </div>
    </Base>
  )
}

export default UserPage