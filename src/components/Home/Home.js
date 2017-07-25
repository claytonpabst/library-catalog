import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Book from './Book/Book.js';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: [{title: 'When you search for a book, the results will display here, along with the total number of copies and the number we have available for checkout'}],
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
    
    axios.get(apiURL)
    .then( res => {
      let results = res.data.slice();
      let distinctArr = []
      for (let i = 0; i < results.length; i ++){

        if (distArrIncludes(results[i].title)){
          for (let j = 0; j < distinctArr.length; j++){
            if (distinctArr[j].title === results[i].title){
              distinctArr[j].copies += 1;
              if (results[i].available.toLowerCase() === 'yes'){
                distinctArr[j].available += 1;
              }
            }
          }
        }else{
          distinctArr.push({
            title: results[i].title,
            author: results[i].author,
            year: results[i].year,
            series: results[i].series,
            copies: 1,
            available: 1
          })
        }
      }

      function distArrIncludes(title){
        for (let j = 0; j < distinctArr.length; j++){
          if (distinctArr[j].title === title){
            return true
          }
        }
        return false
      }

      this.setState({
        results: distinctArr
      })
      console.log(distinctArr)

      // **I had a foor loop set to run a new api call for every single result,
      // but I figure doing less network requests is better than doing more. So
      // instead I am sending back if the book is available or not with each
      // result, and then looping through them myself to create a distinct array
      // that keeps track of each result and how many copies/available there are

      // for (let i = 0; i < results.length; i ++){
      //   axios.get(`/api/books/availability/${results[i].title}`)
      //   .then( nums => {
      //     results[i].numCopies = nums.data.numCopies[0].count;
      //     results[i].numAvailable = nums.data.numAvailable[0].count;
      //     this.setState({
      //       results: results
      //     })
      //   })
      // }

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

            <Link className='login_link' to='/login'>Admin Login</Link>

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
                      numCopies={result.copies}
                      numAvailable={result.available} 
                      />
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