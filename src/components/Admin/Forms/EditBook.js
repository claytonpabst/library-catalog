import React, { Component } from 'react';
import axios from 'axios';

class EditBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookid: '',
      title: '',
      author: '',
      series: '',
      year: ''
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }
 
  handleUpdates(e, str){
    if (str === 'bookid'){
      this.setState({
        bookid: e.target.value
      })
    }else if (str === 'title'){
      this.setState({
        title: e.target.value
      })
    }else if (str === 'author'){
      this.setState({
        author: e.target.value
      })
    }else if (str === 'series'){
      this.setState({
        series: e.target.value
      })
    }else if (str === 'year'){
      this.setState({
        year: e.target.value
      })
    }
  }

  submitInfo(){
    let today  = new Date();
    let { year, bookid } = this.state;

    if (year < 0 || year > today.getFullYear()){
      return alert(`year ${year} is outside the acceptable date range`)
    }

    let newInfo = this.state;
    axios.put(`/api/books/${bookid}`, newInfo)
    .then( res => alert(res) )
  }

  render() {
        return (
      <section className="edit_book">

          <h3>Any information entered into the following fields WILL update the information for that book. Please verify all information is entered into the correct fields before submitting. If a field is left blank, no changes will be made.</h3>

          <h3>BookID of the book we are updating</h3>
          <input placeholder='Enter the BookID here' 
          onChange={ (e) => this.handleUpdates(e, 'bookid') } />

          <h3>Title</h3>
          <input placeholder='Enter the title here' 
          onChange={ (e) => this.handleUpdates(e, 'title') } />

          <h3>Author</h3>
          <input placeholder='Enter the authors name here' 
          onChange={ (e) => this.handleUpdates(e, 'author') } />

          <h3>Series</h3>
          <input placeholder='Enter the name of the series here' 
          onChange={ (e) => this.handleUpdates(e, 'series') } />

          <h3>Year It Was Published</h3>
          <input placeholder='Enter the publishing year here' 
          onChange={ (e) => this.handleUpdates(e, 'year') } />

          <button onClick={ this.submitInfo }>Update</button>

      </section>
    );
  }
}


export default EditBook;