import React, { Component } from 'react';
import axios from 'axios';

class ViewAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberid: '',
      memberInfo: {}
    }

    this.changeID = this.changeID.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeID(e){
    this.setState({
      memberid: e.target.value
    })
  }

  submit(){
    axios.get(`/api/members/${ this.state.memberid }`)
    .then( res => {
      if (res.data[0].city){
        this.setState({
          memberInfo: res.data[0]
        })
      }else{
        alert(res.data)
      }
    })
  }

  render() {
    let member = this.state.memberInfo
    return (
      <section className="view_account">

        <h3 className='form_header'>View A Member's Account</h3>

        <h3>Please provide the membership ID found on the back of the library card in order to view the account.</h3>

        <h3>MemberID</h3>
        <input placeholder='MemberID' 
        onChange={ this.changeID } />

        <button onClick={ this.submit }>Submit</button>
        <button onClick={ () => this.props.changeForm(5) }>Edit Acct</button>

        <ul>
          <li>Firstname: {member.firstname}</li>
          <li>Lastname: {member.lastname}</li>
          <li>Streetaddress: {member.streetaddress}</li>
          <li>City: {member.city}</li>
          <li>State: {member.state}</li>
          <li>Zip: {member.zip}</li>
          <li>Phone: {member.phone}</li>
          <li>Fees: {member.fees}</li>
        </ul>

      </section>
    );
  }
}


export default ViewAccount;