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

            <Link className='nav_link login_link' to='/login'>Login</Link>
            <Link className='nav_link admin_link' to='/admin'>Admin</Link>

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