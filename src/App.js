import React from 'react';
import './App.css';

import {Home} from './components/Home'
import {Professor} from './components/Professor'
import {Student} from './components/Student'
import {Navigation} from './components/Navigation'


// Implementacija za routing
import{BrowserRouter,Route,Switch, NavLink} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">

      <Navigation/>

    {/* path http://localhost:3000/student or professor */}
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/professor' component={Professor}/>
      <Route path='/student' component={Student} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
