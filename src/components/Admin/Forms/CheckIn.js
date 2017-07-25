import React, { Component } from 'react';
import axios from 'axios';

class CheckIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: ''
    }

    this.changeID = this.changeID.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  changeID(e){
    let arr = e.target.value.split('');
    if ( isNaN( Number(arr[arr.length-1]) ) && arr.length ){
      return alert('Only numbers can be entered into the BookID field')
    }else{
      this.setState({
        id: e.target.value
      })
    }
  }

  submitInfo(){
    axios.put(`/api/books/checkin/${this.state.id}`)
    .then( res => alert(res) )
  }

  render() {
        return (
      <section className="check_in">

          <h3 className='form_header'>Check A Book Back In</h3>

          <h3>What is the BookID of the book we are checking back in?</h3>
          <input placeholder='Enter the BookID here' 
          value={ this.state.id }
          onChange={ this.changeID } />

          <button onClick={ this.submitInfo }>Check In</button>

      </section>
    );
  }
}


export default CheckIn;