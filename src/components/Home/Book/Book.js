import React, { Component } from 'react';
import './Book.css';

import BookInfo from './BookInfo/BookInfo.js';

class Book extends Component {
  constructor(props){
    super(props);

    this.state = {
      showBookInfo: false
    }

    this.toggleBookInfo = this.toggleBookInfo.bind(this);
  }

  toggleBookInfo(){
    if (this.state.showBookInfo){
      this.setState({
        showBookInfo: false
      })
    }else{
      this.setState({
        showBookInfo: true
      })
    }
  }
    
  render() {
    let BookInfo = null
    if (this.state.showBookInfo){
      BookInfo = <BookInfo />
    }else{
      BookInfo = null
    }

    return (
        <div className='book_container'>

          <div className='book_result_box' onClick={ this.toggleBookInfo } >
            <h3>{ this.props.title }, { this.props.year }</h3>
            <h4>{ this.props.author }</h4>
            <h4>Copies: { this.props.numCopies }</h4>
            <h4>Available: { this.props.numAvailable }</h4> 
          </div>

          
          { BookInfo }
          <BookInfo />

        </div>
    )
  }
}

export default Book;