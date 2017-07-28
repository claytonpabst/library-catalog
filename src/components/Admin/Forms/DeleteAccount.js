import React, { Component } from 'react';
import axios from 'axios';

class DeleteAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberid: '',
      lastname: ''
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleUpdates(e, str){
    let arr = e.target.value.split('');

    if (str === 'memberid'){
      if ( isNaN( Number(arr[arr.length-1]) ) && arr.length ){
        return alert('Only numbers can be entered into the MemberID field')
      }else{
        this.setState({
          memberid: e.target.value
        })
      }
    }else if (str === 'lastname'){
      this.setState({
        lastname: e.target.value
      })
    }
  }

  submit(){
    axios.delete(`/api/members/${this.state.memberid}?lastname=${this.state.lastname}`)
    .then( res => alert(res.data) )
  }

  render() {
        return (
      <section className="delete_account">

        <h3 className='form_header'>Delete Member Account</h3>

        <h3>The Following Information Is Required To Delete A Membership Record:</h3>

        <h3>MemberID / Membership Number</h3>
        <input placeholder='Enter the MemberID here' value={ this.state.memberid } 
        onChange={ (e) => this.handleUpdates(e, 'memberid') } />

        <h3>Member's Last Name</h3>
        <input placeholder='Enter the members last name here' 
        onChange={ (e) => this.handleUpdates(e, 'lastname') } />

        <button onClick={ this.submit }>Delete</button>

      </section>
    );
  }
}


export default DeleteAccount;