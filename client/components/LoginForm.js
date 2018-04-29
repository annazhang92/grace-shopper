import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin } from '../store';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    const { attemptLogin } = this.props;
    attemptLogin({ email, password });
    this.setState({ email: '', password: '' })
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { onSave, onChange } = this;
    const { email, password } = this.state;
    return (
      <div>
        <h2>Enter Your Information</h2>
        <form onSubmit={ onSave }>
          <div><p>Email</p><input name="email" value={ email } onChange={ onChange } /></div>
          <div><p>Password</p><input name="password" value={ password } onChange={ onChange } /></div>
          <button>Login</button>
        </form>

        <p>Do not have an account?<Link to={`/register`}> Create One </Link></p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    attemptLogin: (credentials)=> dispatch(attemptLogin(credentials, history))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
