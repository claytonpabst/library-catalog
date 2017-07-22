import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

import Book from './Book/Book.js';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: [1, 2],
      userInput: '',
      searchBy: 'title',
      orderBy: 'alph'
    }

    this.UpdateUserInput = this.UpdateUserInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearchBy = this.updateSearchBy.bind(this);
    this.updateOrderBy = this.updateOrderBy.bind(this);
  }

  UpdateUserInput(e){
    this.setState({
      userInput: e.target.value
    })
  }

  handleSearch(){
    let apiURL = `/api/books/${this.state.searchBy}/${this.state.orderBy}/${this.state.userInput}`;
    axios.get(apiURL).then( res => {
      this.setState({
        results: res.data
      })
      console.log(this.state)
    })
  }

  updateSearchBy(e){
    this.setState({
      searchBy: e.target.value
    })
  }

  updateOrderBy(e){
    let newOrderByValue;
    if (e.target.value === 'A-Z'){
      newOrderByValue = 'alph'
    }else{
      newOrderByValue = 'year'
    }
    this.setState({
      orderBy: newOrderByValue
    })
  }

  render() {
    return (
      <div className="home">

          <section className='search_box'>

            <h2 className='search_for_h2'>Search For:</h2>
            <input className='user_search' 
            placeholder='Type your search here'
            onChange={ this.UpdateUserInput } />
            <button className='start_search'
            onClick={ this.handleSearch }>Start Search</button>

            <div className='filter_box search_for_box'>
              <h2>Search By:</h2>
              <select onChange={ this.updateSearchBy }>
                <option>Title</option>
                <option>Author</option>
                <option>Series</option>
              </select>
            </div>

            <div className='filter_box order_by_box'>
              <h2>Order By:</h2>
              <select onChange={ this.updateOrderBy }>
                <option>A-Z</option>
                <option>Year</option>
              </select>
            </div>

          </section>

          <section className='search_results'>

            {/* <button className='pagination prev_results'>Prev</button>
            <button className='pagination next_results'>Next</button> */}
            <ul className='results_container'>
              {
                this.state.results.map( (result, i) => {
                  return <li key={i}>
                      <Book title={result.title}
                      author={result.author}
                      series={result.series}
                      year={result.year}
                      />
                      
                      {/* numCopies={result.numCopies}
                      numAvailable={result.numAvailable}  */}

                    </li>
                })
              }
            </ul>

          </section>
              

      </div>
    );
  }
}


export default Home;