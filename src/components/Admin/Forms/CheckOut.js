import React, { Component } from 'react';
import axios from 'axios';

class CheckOut extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookid: '',
      memberid: '',
      lastname: '',
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }
 
  handleUpdates(e, str){
    let arr = e.target.value.split('');

    if (str === 'bookid'){
      if ( isNaN( Number(arr[arr.length-1]) ) && arr.length ){
        return alert('Only numbers can be entered into the BookID field')
      }else{
        this.setState({
          bookid: e.target.value
        })
      }
    }else if (str === 'memberid'){
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

  submitInfo(){
    axios.put(`/api/books/checkout/${this.state.bookid}`, {
      "memberid": this.state.memberid,
      "lastname": this.state.lastname
    })
    .then( res => alert(res) )
  }

  render() {
        return (
      <section className="check_out">

          <h3>Please fill in the following information in order to check out a book</h3>

          <h3>BookID</h3>
          <input placeholder='Enter the BookID here' value={ this.state.bookid }
          onChange={ (e) => this.handleUpdates(e, 'bookid') } />

          <h3>MemberID / Membership Number</h3>
          <input placeholder='Enter the MemberID here' value={ this.state.memberid } 
          onChange={ (e) => this.handleUpdates(e, 'memberid') } />

          <h3>Member's Last Name</h3>
          <input placeholder='Enter the members last name here' 
          onChange={ (e) => this.handleUpdates(e, 'lastname') } />

          <button onClick={ this.submitInfo }>Check Out</button>

      </section>
    );
  }
}


export default CheckOut;