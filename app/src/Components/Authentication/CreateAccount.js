import React, { Component }  from 'react';
import firebase from './../../services/firebase';

class CreateAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((response) => {
      firebase.firestore().collection('users').doc(response.user.uid).set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        uid: response.user.uid
      })
    })
    .catch(() => {
      // Handle Errors here.
      console.log('You done messed up');
    });
    
  }
  render() {
    return (
      <div className="container">
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
        </form>
      </div>
    );
  }
}

export default CreateAccount;
