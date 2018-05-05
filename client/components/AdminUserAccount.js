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
    this.onChangeAdmin = this.onChangeAdmin.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeAdmin(ev) {
    this.setState({
      isAdmin: ev.target.checked,
    })
  }

  onChangeStatus(ev) {
    this.setState({
      status: ev.target.checked ? 'I': 'A'
    })
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
  }

  render() {
    const { user } = this.props;
    const { isAdmin, status } = this.state;
    const { onChangeAdmin, onChangeStatus, onSave } = this;
    const isInactive = status ==='A' ? false : true  ;
    return (
      <div>
        <form onSubmit={onSave}>
          <label>
            MAKE ADMIN?
            <input
              id="chk1"
              name='isAdmin'
              type='checkbox'
              checked={isAdmin}
              onChange={onChangeAdmin}
            />
          </label>
          <br />
          <label>
            DEACTIVATE USER? 
            <input
              id="chk2"
              name='status'
              type='checkbox'
              checked={isInactive}
              onChange={onChangeStatus}
            />
          </label>
          <br />
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Save Admin & Status</button>          
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(null, mapDispatch)(AdminUserAccount);