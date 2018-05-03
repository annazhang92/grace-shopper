import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props);
    const { users } = props;
    this.state = {
      isAdmin: 'false'
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this);
  //  this.onSave = this.onSave.bind(this);
  }

  onChangeAdmin(ev) {
    console.log('hello')
    /*  this.setState({
      isAdmin: ev.target.value
    })*/
  }

  /*onSave(ev) {
    ev.preventDefault();
    const adminStatus = this.state.isAdmin;
    //LOOP THROUGH UPDATEUSER FOR ALL!!
  }*/

  render() {

    return (
      <div>
        <h2>Users</h2>
        <ul className = 'list-group'>
          {
            users.map(user => {
              return (
                <li key={user.id} className='list-group-item'>
                  {user.fullName}

                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);