import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin } from '../store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
        <h2>Sign in</h2>
        <br />
        <form onSubmit={ onSave }>
          <TextField
              name="email"
              floatingLabelText="Email"
              value={ email }
              onChange={ onChange }
              type="email"
              floatingLabelFixed={true}
          />
          <br />
          <TextField
              name="password"
              floatingLabelText="Password"
              value={ password }
              onChange={ onChange }
              type="password"
              floatingLabelFixed={true}
          />
          <br />
          <br />
          <br />
          <RaisedButton label="Sign in" primary/>
        </form>

        <p>New to Grace Shopper? <br /> <Link to={`/register`}> Create your account </Link></p>
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
