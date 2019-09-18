import React from 'react';
import UserList from './components/UserList.js';
import FormAddUser from './components/FormAddUser';
import FormEditUser from './components/FormEditUser';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function Main() {

  return(
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/userlist">User List</Link>
          </li>
          <li>
            <Link to="/formadduser">Add User</Link>
          </li>
          <li>
            <Link to="/formedituser">Edit User</Link>
          </li>
        </ul>

        <hr />

        <Route path="/userlist" component={UserList} />
        <Route path="/formadduser" component={FormAddUser} />
        <Route path="/formedituser" component={FormEditUser} />
      </div>
    </Router>
  );

}

export default Main;
