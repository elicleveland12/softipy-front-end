import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import App from '../App';

import '../App.css'

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn: null,
    users: []
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createUser = e => {
    e.preventDefault()
    let usernames = this.state.users.map(user => user.username)
    if (usernames.includes(this.state.username)) {
      let foundUser = this.state.users.find(user => user.username === this.state.username)
      this.setState({
        loggedIn: foundUser
      })
    } else {
      let data = {
        username: this.state.username,
        password: this.state.password
      }
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(user => {
        this.setState({
          loggedIn: user
        })
      })
    }
  }

  startSession = () => {
    let id = localStorage.getItem("user")
    console.log(id);
    return <Redirect to="/" />
  }
  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      this.setState({ users }, () => console.log(this.state.users))
    })
  }

  render() {
    if (this.state.loggedIn){
      localStorage.setItem('user', this.state.loggedIn.id)
    }
    console.log(this.state.loggedIn);
    return (
      <div>
      {this.state.loggedIn ? this.startSession() :
        <div className="login">
          <h1>SoftiPy</h1>
          <form onSubmit={this.createUser}>
            <label>Username:</label>
            <input onChange={this.handleOnChange} name="username" value={this.state.username}type="text" />
            <br />
            <label>Password:</label>
            <input onChange={this.handleOnChange} name="password" value={this.state.password}type="password" />
            <br /><br />
            <input type="submit" value="Log In" />
          </form>
        </div>
      }
    </div>
    )
  }
}
