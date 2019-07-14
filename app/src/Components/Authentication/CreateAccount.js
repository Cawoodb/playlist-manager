import React, { Component }  from 'react';
import firebase from './../../services/firebase';
import { Redirect } from 'react-router-dom';

class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errorMessage: '',
    redirect: false
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      firebase.firestore().collection('users').doc(res.user.uid).set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        uid: res.user.uid
      })
    })
    .then (() => {
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
          <h5 className="grey-text text-darken-3">Create Account</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create Account</button>
          </div>
          {this.state.errorMessage &&
            <p>{this.state.errorMessage}</p>}
        </form>
      </div>
    );
  }
}

export default CreateAccount;
