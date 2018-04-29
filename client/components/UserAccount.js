import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateLoggedUser } from '../store';

class UserForm extends Component {
  constructor() {
    super();
    const { user } = this.props;
    this.state = {
      id: user.id ? user.id : '',
      firstName: user.id ? user.firstName : '',
      lastName: user.id ? user.lastName : '',
      password: user.id ? user.password : '',
      email: user.id ? user.email : ''
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //edit mode automatically?
    const { user } = nextProps;
    // if (user.id) {
    //   const { id, firstName, lastName, email, password } = user;
    //   this.setState({ id, firstName, lastName, email, password })
    // }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateUser } = this.props;
    const { id, firstName, lastName, username, email, password } = this.state;
    updateUser({ id, firstName, lastName, username, email, password });
  }

  render() {
    const { onChange, onUpdate } = this;
    const { firstName, lastName, email, password } = this.state;
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Password'
    }
    return (
      <div>
        <h2>User Account</h2>
        <h3>ACCOUNT TYPE IN HERE</h3>
        <form>
          {
            //TODO:
          }
        </form>
      </div>
    )
  }
}

const mapState = ({ user }) => {
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(update(user)),
  }
}

export default connect(mapState, mapDispatch)(UserForm);
