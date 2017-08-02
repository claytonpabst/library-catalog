import React, { Component } from 'react';
import router from './router';

import './reset.css';
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: '/'
    }
  }

  componentDidMount(){
    let path = window.location.href.substring(window.location.href.length-6)
    this.setState({
      currentPage: path
    })
  }

  render() {

    let about, path;
    path = window.location.href.substring(window.location.href.length-6)
    if (path === '/login'){
      about = <div>Login</div>
    }else if (path === '/admin'){
      about = <div>admin</div>
    }else{
      about = <div>Home</div>
    }

    return (
      <div className="App">

          { router }
          { about }

      </div>
    );
  }
}


export default App;
