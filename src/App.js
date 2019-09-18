import React from 'react';
import './App.css';
import Teste from './components/Teste.js';
import Listas from './components/Listas.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {

  return(
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/listas">Listas</Link>
          </li>
          <li>
            <Link to="/teste">Teste</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/listas" component={Listas} />
        <Route path="/teste" component={Teste} />
      </div>
    </Router>
  );

}

export default App;
