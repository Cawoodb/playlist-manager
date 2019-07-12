import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav';
import About from './Components/About';
import Home from './Components/Home';
import LogIn from './Components/Authentication/LogIn';
import Exercise from './Components/Exercise/Exercise';
import CreateAccount from './Components/Authentication/CreateAccount';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/createexercise" component={Exercise}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/createaccount" component={CreateAccount}/>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
