import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../store';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    const userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    this.props.createUser(userInfo);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { onSave, onChange } = this;
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <h2>Enter Your Information</h2>
        <form onSubmit={ onSave }>
          <div><p>First Name</p><input name="firstName" value={ firstName } onChange={ onChange } /></div>
          <div><p>Last Name</p><input name="lastName" value={ lastName } onChange={ onChange } /></div>
          <div><p>Email</p><input name="email" value={ email } onChange={ onChange } /></div>
          <div><p>Password</p><input name="password" value={ password } onChange={ onChange } /></div>
          <button> Register </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createUser: (userInfo)=> dispatch(createUser(userInfo, history))
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
