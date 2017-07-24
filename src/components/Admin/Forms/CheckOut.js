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
    if (str === 'bookid'){
      this.setState({
        bookid: e.target.value
      })
    }else if (str === 'memberid'){
      this.setState({
        memberid: e.target.value
      })
    }else if (str === 'lastname'){
      this.setState({
        lastname: e.target.value
      })
    }
  }

  submitInfo(){
    alert(this.state.bookid)
    alert(this.state.memberid)
    alert(this.state.lastname)
  }

  render() {
        return (
      <section className="check_out">

          <h3>Please fill in the following information in order to check out a book</h3>

          <h3>BookID</h3>
          <input placeholder='Enter the BookID here' 
          onChange={ (e) => this.handleUpdates(e, 'bookid') } />

          <h3>MemberID / Membership Number</h3>
          <input placeholder='Enter the MemberID here' 
          onChange={ (e) => this.handleUpdates(e, 'memberid') } />

          <h3>Member's Last Name</h3>
          <input placeholder='Enter the members last name here' 
          onChange={ (e) => this.handleUpdates(e, 'lastname') } />

          <button onClick={ this.submitInfo }>Add Book</button>

      </section>
    );
  }
}


export default CheckOut;