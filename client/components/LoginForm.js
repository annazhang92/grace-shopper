import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin} from '../store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.handleLogin=this.handleLogin.bind(this);
  }

  validate (){
    let isError = false;
    if(this.state.email.indexOf('@') === -1 && this.state.email.indexOf('.') === -1){
      isError = true;
      this.setState({emailError: "Please enter a email address."});
    }

    if(this.state.password.length < 7){
      isError = true;
      this.setState({passwordError: "Please enter a valid password."});

    }
    
    if(isError){
    }
    return isError;
  }

  onSave(ev) {
    ev.preventDefault();
      if(!this.validate()){
      const { email, password } = this.state;
      const { attemptLogin } = this.props;
      attemptLogin({ email, password });
      this.setState({ email: '', password: '' })
    }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  // handleLogin() {
  //   if(localStorage.getItem('lineItems')) {
  //     const lineItems = JSON.parse(localStorage.getItem('lineItems'))
  //     lineItems.map(lineItem=>this.props.createLineItem(lineItem))
  //   }
  // }

  render() {
    const { onSave, onChange } = this;
    const { email, password } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={ onSave }>
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
            <RaisedButton label="Login" onClick={ev => this.onSave(ev)} primary />
        </form>

        <p>New to Grace Shopper? <br /> <Link to={`/register`}> Create an account! </Link></p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    attemptLogin: (credentials)=> dispatch(attemptLogin(credentials, history)),
    // createLineItem: (lineItem) => dispatch(createLineItem(lineItem,history)),

  };
};

export default connect(null, mapDispatchToProps)(LoginForm);