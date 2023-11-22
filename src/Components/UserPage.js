import Base from './Base'
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { AppCont } from './AppProvider';

function UserPage() {
  const { user, setUser } = AppCont()

  // delete book api
  
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
    const deletedBook = user.filter((book) => book.id !== idx)
    setUser(deletedBook)
  }
  const history = useHistory()
  return (
    <Base
      tittle="Book Details">
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th className="col-2">Title</th>
              <th className="col-2" >Author </th>
              <th className="col-2">ISBN Number</th>
              <th className="col-2">Publication Date</th>
              <th className='col-2'>Operation</th>
            </tr>
          </thead>
        </Table>
        {user.map((book, id) => (
          <div key={id}>
            <Table >
              <tbody>
                <tr>
                  <td className="col-2">{book.title}</td>
                  <td className="col-2">{book.author}</td>
                  <td className="col-2">{book.isbnNumber}</td>
                  <td className='col-2'>{book.publicationDate}</td>
                  <td className="col-2">
                    <div>
                      <button onClick={() => history.push(`edit/${book.id}`)} className="edit-btn" >Edit </button>{' '}
                      <button onClick={() => deleteUser(book.id)} className="delete-btn"> Delete </button>{' '}
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