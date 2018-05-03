import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store'; 

class AdminUserAccount extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      id: user.id ? user.id : '',
      firstName: user.id ? user.firstName : '',
      lastName: user.id ? user.lastName : '',
      email: user.id ? user.email : '',
      password: user.id ? user.password : '',
      isAdmin: user.id ? user.isAdmin : '',
      status: user.id ? user.status : ''
    }
    this.onChangeAdminStatus = this.onChangeAdminStatus.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeAdminStatus(ev) {
    this.setState({
      isAdmin: ev.target.checked,
      status: ev.target.checked ? 'I': 'A'
    })
  }

  onSave(ev) {
    ev.preventDefault();
    console.log(this.state);
    this.props.updateUser(this.state);
  }

  render() {
    const { user } = this.props;
    const { isAdmin, status } = this.state;
    const { onChangeAdminStatus, onSave } = this;
    const isInactive = status ==='A' ? false : true  ;
    return (
      <div>
        <form onSubmit={onSave}>
          <label>
            MAKE ADMIN?
            <input
              name='isAdmin'
              type='checkbox'
              checked={isAdmin}
              onChange={onChangeAdminStatus}
            />
          </label>
          <br />
          <label>
            DEACTIVATE USER? 
            <input
              name='status'
              type='checkbox'
              checked={isInactive}
              onChange={onChangeAdminStatus}
            />
          </label>
          <br />
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Save Admin & Status</button>          
        </form>
      </div>
    )
  }
}

const mapState = ({ user }) => {
  return {
    user
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(AdminUserAccount);