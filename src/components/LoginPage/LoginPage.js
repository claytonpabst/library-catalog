import React, { Component } from 'react';
import './LoginPage.css';

import axios from 'axios';


class LoginPage extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     username: '',
  //     password: ''
  //   }

  //   this.authorizeLogin = this.authorizeLogin.bind(this);
  //   this.updateUsername = this.updateUsername.bind(this);
  //   this.updatePassword = this.updatePassword.bind(this);
  // }

  // authorizeLogin(){
  //   axios.post('/api/login', {
  //     "username": this.state.username,
  //     "password": this.state.password
  //   })
  //   .then( res => {
  //     console.log(res);
  //   })
  // }

  // updateUsername(e){
  //   this.setState({
  //     username: e.target.value
  //   })
  // }

  // updatePassword(e){
  //   this.setState({
  //     password: e.target.value
  //   })
  // }

  render() {
    return (
      <div className="login_page">

          {/* <h2>Admin Login</h2>

          <div className='login_modal'>
            <h4>USERNAME</h4>
            <input placeholder='username' onChange={ this.updateUsername }/>
            <h4>PASSWORD</h4>
            <input placeholder='password' type='password' onChange={ this.updatePassword } />
            <button onClick={ this.authorizeLogin } >Login</button>
          </div> */}

      </div>
    );
  }
}


export default LoginPage;