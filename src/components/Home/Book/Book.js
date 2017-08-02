import React, { Component } from 'react';
import './Book.css';

class Book extends Component {
    
  render() {

    let bookId = null;
    if (this.props.bookId){
      bookId = `${this.props.bookId} - `;
    }else{
      bookId = null;
    }

    return (
          <div className='book_result_box' >
            <h3>{ bookId } { this.props.title }, { this.props.year }</h3>
            <h4>{ this.props.author }</h4>
            <h4>Copies: { this.props.numCopies }</h4>
            <h4>Available: { this.props.numAvailable }</h4> 
          </div>
    )
  }
}

export default Book;