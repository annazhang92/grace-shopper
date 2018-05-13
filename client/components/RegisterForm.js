import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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

  validate (){
    let isError = false;
    if(this.state.firstName.length <= 1){
      isError = true;
      this.setState({firstNameError: "Your first name should be at least 2 characters long."});
    }

    if(this.state.lastName.length <= 1){
      isError = true;
      this.setState({lastNameError: "Your last name should be at least 2 characters long."});

    }

    if(this.state.email.indexOf('@') === -1 && this.state.email.indexOf('.') === -1){
      isError = true;
      this.setState({emailError: "Invalid email address."});
    }

    if(this.state.password.length < 7){
      isError = true;
      this.setState({passwordError: "Password needs to be at least 8 characters long."});
    }
    
    if(isError){
    }
    return isError;
  }

  onSave(ev) {
    ev.preventDefault();
    if(!this.validate()){
      const userInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      this.props.createUser(userInfo);
      this.setState({
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
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
        <h2>Create account</h2>
        <br />
        <form onSubmit={ onSave }>
          <TextField
            name="firstName"
            floatingLabelText="First Name"
            value={ firstName }
            onChange={ onChange }
            floatingLabelFixed={true}
            errorText={this.state.firstNameError}
          />
          <br />
          <TextField
            name="lastName"
            floatingLabelText="Last Name"
            value={ lastName }
            onChange={ onChange }
            floatingLabelFixed={true}
            errorText={this.state.lastNameError}
          />
          <br />
          <TextField
            name="email"
            floatingLabelText="Email Address"
            value={ email }
            onChange={ onChange }
            floatingLabelFixed={true}
            type="email"
            errorText={this.state.emailError}
          />
          <br /> 
          <TextField
            name="password"
            floatingLabelText="Password"
            value={ password }
            onChange={ onChange }
            floatingLabelFixed={true}
            type="password"
            errorText={this.state.passwordError}
          />
          <br />      
          <br />
          <br />
          <RaisedButton label="Register" onClick={ev => this.onSave(ev)} primary />
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
