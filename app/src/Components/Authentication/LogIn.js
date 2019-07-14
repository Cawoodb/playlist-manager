import React, { Component }  from 'react';
import firebase from './../../services/firebase';
import { Redirect } from 'react-router-dom';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    errorMessage:'',
    redirect: false
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      // Will probably want to send save the auth in redux here.
    })
    .then(() => {
      this.setState({redirect: true})
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      this.setState({errorMessage: error.message})
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.redirect 
        && <Redirect to='' push={true} />}
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Log In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Log In</button>
          </div>
        </form>
        {this.state.errorMessage &&
          <p>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default LogIn;
