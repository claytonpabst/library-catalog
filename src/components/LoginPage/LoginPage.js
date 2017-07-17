import React, { Component } from 'react';
import './LoginPage.css';


class LoginPage extends Component {

  render() {
    return (
      <div className="login_page">

          <h2>Admin Login</h2>
          
          <div className='login_modal'>
            <h4>USERNAME</h4>
            <input placeholder='username' />
            <h4>PASSWORD</h4>
            <input placeholder='password' type='password' />
          </div>

      </div>
    );
  }
}


export default LoginPage;