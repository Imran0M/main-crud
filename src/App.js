import './App.css';
import UserPage from './Components/UserPage';
import { Switch, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

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
      </Switch>
    </div>
  );
}

export default App;
