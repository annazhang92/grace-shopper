import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store'; 

class AdminUserAccount extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      isAdmin: user.id ? user.isAdmin : '',
      status: user.id ? user.status : ''
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this);
  }

  onChangeAdmin(ev) {
    this.setState({
      isAdmin: ev.target.checked
    })
  }

  render() {
    const { user } = this.props;
    const { onChangeAdmin, onSave } = this;
    return (
      <div>
        <form>
          <label>
            MAKE ADMIN?
            <input
              name='isAdmin'
              type='checkbox'
              value={this.state.isAdmin}
              onChange={onChangeAdmin}
            />
          </label>
          <br />
          <label>
          INACTIVATE?
          <input
            name='isAdmin'
            type='checkbox'
            value={this.state.isAdmin}
            onChange={onChangeAdmin}
          />
        </label>
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