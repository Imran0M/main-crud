import Base from './Base'
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { AppCont } from './AppProvider';

function AuthorPage() {
  const {  author , setAuthor } = AppCont()
  // delete author Api
  const deleteUser = async (idx) => {
    try {
      const response = await fetch(`https://655b477aab37729791a8d482.mockapi.io/crud/api/${idx}`,{
        method:"Delete",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      setAuthor(data)
      if (!data){
        console.log("data nor fetching")
      }
    } catch (error) {
      console.log("Data not found")
    }
    const deletedBook = author.filter((book) => book.id !== idx)
    setAuthor(deletedBook)
  }
  const history = useHistory()
  return (
    <Base
      tittle="Author Details">
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th className="col-2" >Author Name </th>
              <th className="col-2">Birth Date</th>
              <th className="col-2">Short Bio </th>
              <th className="col-2">Operation </th>
            </tr>
          </thead>
        </Table>
        {author.map((book, id) => (
          <div key={id}>
            <Table >
              <tbody>
                <tr>
                  <td className="col-2">{book.authorName}</td>
                  <td className="col-2">{book.birthDate}</td>
                  <td className="col-2">{book.shortBio}</td>
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

export default AuthorPage