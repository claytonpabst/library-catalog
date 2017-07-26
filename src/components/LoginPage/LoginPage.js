import React, { Component } from 'react';
import './LoginPage.css';

import axios from 'axios';
import { Link } from 'react-router-dom';


class LoginPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      loginResults: 'successfully logged in as yourmamashouse',
      showBttn: true
    }

    this.authorizeLogin = this.authorizeLogin.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  authorizeLogin(){
    axios.post('/api/login', {
      "username": this.state.username,
      "password": this.state.password
    })
    .then( res => {
      let data = res.data;
      if (data[0].username === this.state.username){
        this.setState({
          showBttn: true,
          loginResults: 'Succesfully Logged in as ' + data[0].username
        })
      }else{
        this.setState({
          showBttn: false,
          loginResults: res.data
        })
      }
    })
  }

  updateUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  updatePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  render() {
    
    let routeBttn = null;
    if (this.state.showBttn){
      routeBttn = <Link to='/admin'><button>OK</button></Link>
    }

    return (
      <div className="login_page">

           <h2>Admin Login</h2>

          <div className='login_modal'>
            <h4>USERNAME</h4>
            <input placeholder='username' onChange={ this.updateUsername }/>
            <h4>PASSWORD</h4>
            <input placeholder='password' type='password' onChange={ this.updatePassword } />
            <button onClick={ this.authorizeLogin } >Login</button>
          </div> 

          <div className='login_results'>
            { this.state.loginResults }
            { routeBttn }
          </div>

      </div>
    );
  }
}


export default LoginPage;