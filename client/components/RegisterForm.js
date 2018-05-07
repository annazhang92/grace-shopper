import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../store';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

validate = () =>{
  let isError = false;
  const errors = {};
  if(this.state.password.length < 5){
    isError = true;
    errors.password = "Password needs to be at least 5 characters long"
  }

  if(isError){
    this.setState({
      ...this.state,
      ...errors
    })
  }
  return isError;
}

  onSave(ev) {
    ev.preventDefault();
    const err = this.validate();
    if(!err){
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
          <div><p>First Name</p><input name="firstName" value={ firstName } onChange={ onChange } errorText={this.state.firstNameError} /></div>
          <div><p>Last Name</p><input name="lastName" value={ lastName } onChange={ onChange } errorText={this.state.lastNameError}/></div>
          <div><p>Email</p><input name="email" value={ email } onChange={ onChange } errorText={this.state.emailError} /></div>
          <div><p>Password</p><input name="password" value={ password } onChange={ onChange } errorText={this.state.passwordError}/></div>
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
