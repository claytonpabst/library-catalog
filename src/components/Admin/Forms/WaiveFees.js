import React, { Component } from 'react';
import axios from 'axios';

class WaiveFees extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberid: '',
      fees: ''
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
    }else if (str === 'fees'){
      this.setState({
        fees: e.target.value
      })
    }
  }

  submitInfo(){
    axios.put(`/api/members/${ this.state.memberid }`, {})
    .then( res => alert(res) )
  }

  render() {
        return (
      <section className="waive_fees">

        <h3 className='form_header'>Waive Fees</h3>

        <h3>Please enter the Membership ID of the member who's fees we are modifying. Then type the updated fee amount that you want to reflect on their account.</h3>

        <h3>MemberID of the member account we are updating</h3>
        <input placeholder='Enter the MemberID here' 
        onChange={ (e) => this.handleUpdates(e, 'memberid') } />

        <h3>New Fee Amount</h3>
        <input placeholder='Enter the new fee amount here' 
        onChange={ (e) => this.handleUpdates(e, 'fees') } />

        <button onClick={ this.submitInfo }>Update Fees</button>

      </section>
    );
  }
}


export default WaiveFees;