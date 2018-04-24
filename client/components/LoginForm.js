import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    const userInfor = { email: this.state.email, password: this.state.password };
    // this.props.authenticate(userInfor)
  }

  onChange(ev) {
    const nameKey = ev.target.name;
    this.setState({ [nameKey]: ev.target.value });
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

        <p>Do not have an account?<Link to={`/register`}>Create One</Link></p> 
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    authenticate: (userInfor)=> dispatch(authenticate(userInfor, history)),
  };
};
      
export default connect(null, mapDispatchToProps)(LoginForm)