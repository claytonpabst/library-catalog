import React, { Component } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddBook from './Forms/AddBook.js';
import CheckIn from './Forms/CheckIn.js';
import CheckOut from './Forms/CheckOut.js';
import CreateAccount from './Forms/CreateAccount.js';
import DeleteAccount from './Forms/DeleteAccount.js';
import DeleteBook from './Forms/DeleteBook.js';
import EditAccount from './Forms/EditAccount.js';
import EditBook from './Forms/EditBook.js';
import ViewAccount from './Forms/ViewAccount.js';
import WaiveFees from './Forms/WaiveFees.js';


class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentForm: 1,
      showLogoutModal: false,
      showLoggedOut: false
    }

    this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
    this.changeForm = this.changeForm.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  changeForm(num){
    this.setState({
      currentForm: num
    })
  }

  toggleLogoutModal(str){
    let newVal;
    if (str === 'close'){
      newVal = false;
    }else{
      newVal = !this.state.showLogoutModal
    }
    this.setState({
      showLogoutModal: newVal
    })
  }

  handleLogout(){
    axios.post(`/api/logout`)
    .then( response => {
      this.setState({
        showLoggedOut: true
      })
    })
  }

  render() {
    let formToShow;
    if (this.state.currentForm === 1){
      formToShow = <CheckOut />
    }else if (this.state.currentForm === 2){
      formToShow = <CheckIn />
    }else if (this.state.currentForm === 3){
      formToShow = <ViewAccount changeForm={ this.changeForm } />
    }else if (this.state.currentForm === 4){
      formToShow = <CreateAccount />
    }else if (this.state.currentForm === 5){
      formToShow = <EditAccount />
    }else if (this.state.currentForm === 6){
      formToShow = <DeleteAccount />
    }else if (this.state.currentForm === 7){
      formToShow = <AddBook />
    }else if (this.state.currentForm === 8){
      formToShow = <EditBook />
    }else if (this.state.currentForm === 9){
      formToShow = <DeleteBook />
    }else if (this.state.currentForm === 10){
      formToShow = <WaiveFees />
    }

    let logoutModal = null;
    if (this.state.showLogoutModal){
      if (this.state.showLoggedOut){
        logoutModal = 
          <div className='logout_modal'>
            <p>Successfully Logged Out</p>
            <Link to='/'>OK</Link>
          </div>
      }else{
        logoutModal = 
          <div className='logout_modal'>
            <p>Are you sure you want to logout?</p>
            <button onClick={ this.handleLogout }>Yes</button>
            <button onClick={ () => this.toggleLogoutModal('close') }>No</button>
          </div>
      }
    }else{
      logoutModal = null;
    }

    return (
      <section className="admin">

          <ul className='side_nav'>
            <li onClick={ () => this.changeForm(1) }>Check A Book Out</li>
            <li onClick={ () => this.changeForm(2) }>Check A Book Back In</li>
            <li onClick={ () => this.changeForm(3) }>View A Member's Account</li>
            <li onClick={ () => this.changeForm(4) }>Create Member Account</li>
            <li onClick={ () => this.changeForm(5) }>Edit Member Account</li>
            <li onClick={ () => this.changeForm(6) }>Delete Member Account</li>
            <li onClick={ () => this.changeForm(7) }>Add New Book To Record</li>
            <li onClick={ () => this.changeForm(8) }>Edit Existing Book</li>
            <li onClick={ () => this.changeForm(9) }>Delete Book From Record</li>
            <li onClick={ () => this.changeForm(10) }>Waive Fees</li>
          </ul>

          <section className='admin_form'>
            <Link className='home_link admin_nav' to='/' >Search Books</Link>
            <div className='logout_btn admin_nav' onClick={ this.toggleLogoutModal }>Logout</div>
            { formToShow }
          </section>

          { logoutModal }

      </section>
    );
  }
}


export default Admin;