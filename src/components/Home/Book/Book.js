import React, { Component } from 'react';
import './Book.css';

class Book extends Component {
    
  render() {
    return (
        <div className='book_result_box'>
          <h3>{ this.props.title }, { this.props.year }</h3>
          <h4>{ this.props.author }</h4>
          <h4>Copies: { this.props.numCopies }</h4>
          <h4>Available: { this.props.numAvailable }</h4> 
        </div>
    )
  }
}

export default Book;