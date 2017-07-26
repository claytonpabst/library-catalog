import React, { Component } from 'react';
import axios from 'axios';

class ViewAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      memberid: '',
      fields: ['Firstname', 'Lastname', 'Street Address', 'City', 'State', 'Zip', 'Phone', 'Fees'],
      memberInfo: ['', '', '', '', '', '', '', null]
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
      if (res.data[0].city){
        this.setState({
          memberInfo: res.data[0]
        })
      }else{
        alert(res)
      }
    })
  }

  render() {
        return (
      <section className="view_account">

        <h3 className='form_header'>View A Member's Account</h3>

        <h3>Please provide the membership ID found on the back of the library card in order to view the account.</h3>

        <h3>MemberID</h3>
        <input placeholder='MemberID' 
        onChange={ this.changeID } />

        <button onClick={ this.submit }>Submit</button>
        <button onClick={ () => this.props.changeForm(5) }>Edit Acct</button>

        <ul>
          {
            this.state.memberInfo.map( (item, i) => {
              if (this.state.fields[i] === 'Fees'){
                return <li key={i}><span>{ this.state.fields[i] }</span>: ${ item }</li>
              }else{
                return <li key={i}><span>{ this.state.fields[i] }</span>: { item }</li>
              }
            })
          }
        </ul>

      </section>
    );
  }
}


export default ViewAccount;