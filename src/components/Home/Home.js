import React, { Component } from 'react';
import './Home.css';

import Book from './Book/Book.js';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: [1, 2, 3]
    }
  }

  render() {
    return (
      <div className="home">

          <section className='search_box'>

            <h2 className='search_for_h2'>Search For:</h2>
            <input className='user_search' placeholder='Type your search here' />
            <button className='start_search'>Start Search</button>

            <div className='filter_box search_for_box'>
              <h2>Search By:</h2>
              <select>
                <option>Title</option>
                <option>Author</option>
                <option>Series</option>
              </select>
            </div>

            <div className='filter_box order_by_box'>
              <h2>Order By:</h2>
              <select>
                <option>Year</option>
                <option>A-Z</option>
              </select>
            </div>

          </section>

          <section className='search_results'>

            <button className='pagination prev_results'>Prev</button>
            <button className='pagination next_results'>Next</button>
            <ul className='results_container'>
              {
                this.state.results.map( (result,i) => {
                  return <li>
                      <Book />
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