import React, { Component } from 'react';
import axios from 'axios';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      author: '',
      series: '',
      year: '',
      copies: 1
    }

    this.handleUpdates = this.handleUpdates.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }
 
  handleUpdates(e, str){
    if (str === 'title'){
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
    }else if (str === 'copies'){
      this.setState({
        copies: e.target.value
      })
    }
  }

  submitInfo(){
    let today  = new Date();
    let {title, author, series, year, copies} = this.state;

    if (year < 0 || year > today.getFullYear()){
      return alert(`year ${year} is outside the acceptable date range`)
    }
    if (copies > 10){
      return alert(`You are attempting to add ${copies} copies to the system. Cannot add more than 10 copies at once!`)
    }

    axios.post('/api/books', {
      "title": title,
      "author": author,
      "series": series,
      "year": year,
      "copies": copies
    })
    .then( res => alert(res) )
  }

  render() {
        return (
      <section className="add_book">

          <h3 className='form_header'>Add New Book To Record</h3>

          <h3>Please fill in the following information in order to add a new book
            to the system. </h3>

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

          <h3>How Many Copies Are We Adding?</h3>
          <input type="number" name="quantity" min="1" max="10" value={ this.state.copies }
          onChange={ (e) => this.handleUpdates(e, 'copies') } />

          <button onClick={ this.submitInfo }>Add Book</button>

      </section>
    );
  }
}


export default AddBook;