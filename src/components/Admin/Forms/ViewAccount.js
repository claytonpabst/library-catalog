import React, { Component } from 'react';
import axios from 'axios';

class ViewAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberid: '',
      fields: ['firstname:  ', 'lastname:  ', 'street address:  ', 'city:  ', 'state:  ', 'zip:  ', 'phone:  '],
      memberInfo: ['loren', 'pabst', '1944 n 1575 w', 'layton', 'ut', '84041', '801-825-8909']
    }

    this.changeID = this.changeID.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeID(e){
    this.setState({
      memberid: e.target.value
    })
  }

  submit(){
    axios.get(`/api/members/${ this.state.memberid }`)
    .then( res => {
      this.setState({
        memberInfo: res.data
      }) 
    })
  }

  render() {
        return (
      <section className="view_account">

        <h3>Please provide the membership ID found on the back of the library card in order to view the account.</h3>

        <h3>MemberID</h3>
        <input placeholder='MemberID' 
        onChange={ this.changeID } />

        <button onClick={ this.submit }>Submit</button>
        <button>Edit Acct</button>

        <ul>
          {
            this.state.memberInfo.map( (item, i) => {
              return <li key={i}>{ this.state.fields[i] } { item }</li>
            })
          }
        </ul>

      </section>
    );
  }
}


export default ViewAccount;