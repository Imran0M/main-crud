import './App.css';
import UserPage from './Components/UserPage';
import { Switch, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import AddAuthor from './Components/AddAuthor';
import AuthorPage from './Components/AuthorPage';
import EditAuthor from './Components/EditAutor';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <UserPage />
        </Route>
        <Route path='/add/user'>
          <AddUser />
        </Route>
        <Route path='/edit/:id'>
          <EditUser />
        </Route>
        <Route path='/add/author'>
          <AddAuthor/>
        </Route>
        <Route path='/author/page'>
          <AuthorPage/>
        </Route>
        <Route path='/author/edit/:id'>
          <EditAuthor/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
