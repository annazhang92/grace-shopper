import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { users } = this.props;
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

export default connect(mapStateToProps)(Users);