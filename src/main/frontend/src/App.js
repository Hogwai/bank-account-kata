import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/register' exact={true} component={Register} />
          <Route path='/bankaccount/:username' exact={true} component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App;