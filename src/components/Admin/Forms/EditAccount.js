import React, { Component } from 'react';
import axios from 'axios';

class EditAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      memeberid: '',
      firstname: '',
      lastname: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }
 
  handleUpdates(e, str){
    if (str === 'memeberid'){
      let arr = e.target.value.split('');
      if ( isNaN(Number(arr[arr.length-1])) && arr.length ){
        alert('Only numbers can be entered into the MemberID field.')
      }else{
        this.setState({
          memeberid: e.target.value
        })
      }
    }else if (str === 'firstname'){
      this.setState({
        firstname: e.target.value
      })
    }else if (str === 'lastname'){
      this.setState({
        lastname: e.target.value
      })
    }else if (str === 'streetAddress'){
      this.setState({
        streetAddress: e.target.value
      })
    }else if (str === 'city'){
      this.setState({
        city: e.target.value
      })
    }else if (str === 'state'){
      this.setState({
        state: e.target.value
      })
    }else if (str === 'zip'){
      let arr = e.target.value.split('');
      if ( isNaN(Number(arr[arr.length-1])) && arr.length ){
        alert('Only numbers can be entered into the zip code field.')
      }else{
        this.setState({
          zip: e.target.value
        })
      }
    }else if (str === 'phone'){
      let arr = e.target.value.split('');

      if ( isNaN(Number(arr[arr.length-1])) && arr.length ){
        alert('Only numbers can be entered into phone number field.')
      }else{
        this.setState({
          phone: e.target.value
        })
      }

    }
  }

  submitInfo(){

    if (this.state.zip.length !== 5){
      return alert('Zip code must be 5 digits long')
    }
    if (this.state.phone.length !== 14){
      return alert('Phone number must include area code and must be 10 digits long')
    }
    
    let newInfo = this.state;
    axios.put(`/api/members/${ this.state.memeberid }`, newInfo)
    .then( res => alert(res) )
    
  }

  render() {
    return (
      <section className="edit_account">

        <h3 className='form_header'>Edit Member Account</h3>

        <h3>Any information entered into the following fields WILL update the information on the members account. Please verify all information is entered into the correct fields before submitting. If a field is left blank, no changes will be made.</h3>

        <h3>MemberID of the member account we are updating</h3>
        <input placeholder='Enter the MemberID here' 
        onChange={ (e) => this.handleUpdates(e, 'memeberid') } />

        <h3>Firstname</h3>
        <input placeholder='Firstname' 
        onChange={ (e) => this.handleUpdates(e, 'firstname') } />

        <h3>Lastname</h3>
        <input placeholder='Lastname' 
        onChange={ (e) => this.handleUpdates(e, 'lastname') } />

        <h3>Street Address (Don't include the city state or zip here)</h3>
        <input placeholder='ex: 1522 S 1800 W #137' 
        onChange={ (e) => this.handleUpdates(e, 'streetAddress') } />

        <h3>City</h3>
        <input placeholder='City' 
        onChange={ (e) => this.handleUpdates(e, 'city') } />

        <h3>State</h3>
        <input placeholder='State'
        onChange={ (e) => this.handleUpdates(e, 'state') } />

        <h3>Zip Code</h3>
        <input placeholder='Zip' value={ this.state.zip }
        onChange={ (e) => this.handleUpdates(e, 'zip') } />

        <h3>Best Contact Number (Numbers must be entered without any spaces or dashes)</h3>
        <input placeholder='Phone Number' value={ this.state.phone }
        onChange={ (e) => this.handleUpdates(e, 'phone') } />

        <button onClick={ this.submitInfo }>Update</button>

      </section>
    );
  }
}


export default EditAccount;