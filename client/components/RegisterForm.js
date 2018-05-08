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
    // let isError = false;
    // const errors = {};

    if(this.state.firstName.length <= 1){
      // isError = true;
      // errors.firstNameError = "Your first name should be at least 2 characters long."
      this.setState({firstNameError: "Your first name should be at least 2 characters long."});
    }

    if(this.state.lastName.length <= 1){
      // isError = true;
      // errors.lastNameError = "Your last name should be at least 2 characters long."
      this.setState({lastNameError: "Your first name should be at least 2 characters long."});

    }

    if(this.state.email.indexOf('@') === -1 && this.state.email.indexOf('.') === -1){
      // isError = true;
      // errors.emailError = "Invalid email address."
      this.setState({emailError: "Invalid email address."});
    }


    if(this.state.password.length < 5){
      // isError = true;
      // errors.password = "Password needs to be at least 8 characters long."
      this.setState({passwordError: "Password needs to be at least 8 characters long."});

    }

    // // if(isError){
    // //   this.setState({
    // //   // ...this.state,
    // //   //    ...errors
    // //   });
    // }
    // return isError;
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
    console.log(this.state);
    const { onSave, onChange } = this;
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
        <h2>Enter Your Information</h2>
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
