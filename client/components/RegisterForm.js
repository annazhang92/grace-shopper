import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../store';


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
    const { register } = this.props;
    const userInfo = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    register(userInfo);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    // this.props.register(userInfo)
  }

  onChange(ev) {
    const nameKey = ev.target.name;
    this.setState({ [nameKey]: ev.target.value });
  }

  render() {
    const { onSave, onChange } = this;
    const { firstname, lastname, email, password } = this.state;
    return (
      <div>
        <h2>Enter Your Information</h2>
        <form onSubmit={ onSave }>
          <div><p>First Name</p><input name="firstName" value={ firstname } onChange={ onChange } /></div>
          <div><p>Last Name</p><input name="lastName" value={ lastname } onChange={ onChange } /></div>
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
    register: ( userInfo )=> dispatch(register(userInfo, history)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
