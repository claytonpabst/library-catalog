import React, { Component } from 'react';
import axios from 'axios';

class DeleteBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookid: ''
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleUpdates(e, str){
    let arr = e.target.value.split('');

    if(isNaN( Number(arr[arr.length-1])) && arr.length){
      return alert('Only numbers can be entered into the bookid field')
    }else{
      this.setState({
        bookid: e.target.value
      })
    }

  }

  submit(){
    axios.delete(`/api/books/${this.state.bookid}`)
    .then( res => alert(res) )
  }

  render() {
    return (

      <section className="delete_book">

        <h3 className='form_header'>Delete Book From Record</h3>

        <h3>The Following Information Is Required To Delete A Book From The System:</h3>

        <h3>BookID</h3>
        <input placeholder='Enter the BookID here' value={ this.state.bookid } 
        onChange={ (e) => this.handleUpdates(e, 'bookid') } />

        <button onClick={ this.submit }>Delete</button>
        
      </section>
      
    );
  }
}


export default DeleteBook;