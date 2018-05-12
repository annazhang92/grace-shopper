import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateAddress, createAddress, updateNavUser } from '../store';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AdminUserAccount from './AdminUserAccount';
import PastOrders from './PastOrders';



class UserForm extends Component {
  constructor(props) {
    super(props);
    const { userToRender, userAddress } = props;
    this.state = {
      id: userToRender ? userToRender.id : '',
      firstName: userToRender ? userToRender.firstName : '',
      firstNameError: '',
      lastName: userToRender ? userToRender.lastName : '',
      lastNameError: '',
      password: userToRender ? userToRender.password : '',
      email: userToRender ? userToRender.email : '',
      emailError: '',
      isAdmin: userToRender ? userToRender.isAdmin : '',
//      isPrimary: userAddress ? userAddress.isPrimary : '',
      address1: userAddress ? userAddress.address1 : '',
      address1Error: '',
      address2: userAddress ? userAddress.address2 : '',
      address2Error: '',
      city: userAddress ? userAddress.city: '',
      cityError: '',
      state: userAddress ? userAddress.state : '',
      stateError: '',
      zipCode: userAddress ? userAddress.zipCode : '',
      zipCodeError: '',
      phoneNumber: userAddress ? userAddress.phoneNumber : '',
      phoneNumberError: '',
      showComponent: false,
      updating: false 
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onShowPastOrders = this.onShowPastOrders.bind(this);
  }

  validate (){
    let isError = false;
    if(this.state.firstName.length <= 1){
      isError = true;
      this.setState({firstNameError: "Your first name should be at least 2 characters long."});
    }

    if(this.state.lastName.length <= 1){
      isError = true;
      this.setState({lastNameError: "Your first name should be at least 2 characters long."});

    }

    if(this.state.email.indexOf('@') === -1 && this.state.email.indexOf('.') === -1){
      isError = true;
      this.setState({emailError: "Invalid email address."});
    }

    if(this.state.password.length < 7){
      isError = true;
      this.setState({passwordError: "Password needs to be at least 8 characters long."});
    }

    if(this.state.address1.length < 5 && this.state.address1.indexOf(' ') === -1){
      isError = true;
      this.setState({address1Error: "Please enter a valid address."});
    }

    if(this.state.address2.length < 5 && this.state.address2.indexOf(' ') === -1){
      isError = true;
      this.setState({address2Error: "Please enter a valid address."});
    }
    if(this.state.city.length < 5){
      isError = true;
      this.setState({cityError: "Please enter a valid city."});
    }

    if(this.state.state.length < 3){
      isError = true;
      this.setState({stateError: "Please enter a valid city."});
    }

    if(this.state.zipCode.length < 5){
      isError = true;
      this.setState({zipCodeError: "Please enter a valid city."});
    }

    if(this.state.phoneNumber.length != 12 && this.state.phoneNumber.indexOf('-') === -1){
      isError = true;
      this.setState({phoneNumberError: "Please enter a valid phone number in XXX-XXX-XXXX format."});
    }

    
    if(isError){
    }
    return isError;
  }

  componentWillReceiveProps(nextProps) {
    const { userToRender, userAddress, user, currentUserId } = nextProps;
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault();
    if(!this.validate()){
      const { userToRender, updateUser, updateAddress, userAddress, updateNavUser, user } = this.props;
      const { id, firstName, lastName, password, email, isAdmin, address1, address2, city, state, zipCode, phoneNumber } = this.state;
      const userId = id;
      const newUserInfo = { id, firstName, lastName, password, email, isAdmin };
      const newAddressInfo = { id, address1, address2, city, state, zipCode, phoneNumber, userId };
      updateUser(newUserInfo);
      userAddress ? updateAddress(newAddressInfo) : createAddress(newAddressInfo);
      (user.id === userToRender.id) ? updateNavUser(newUserInfo) : null;
      this.setState({ updating: false });
    }
  }

  onShowPastOrders() {
    const { showComponent } = this.state;
    showComponent ? this.setState({ showComponent: false }) : this.setState({ showComponent: true })
  }

  render() {
    const { onChange, onUpdate, onShowPastOrders } = this;
    const { userToRender, user } = this.props;
    const { firstName, lastName, email, password, isPrimary, address1, address2, city, state, zipCode, phoneNumber, showComponent, updating } = this.state;
    // const inputs = {
    //   firstName: 'First Name',
    //   lastName: 'Last Name',
    //   email: 'Email Address',
    //   password: 'Password',
    //   address1: 'Street Address',
    //   address2: 'Apartment Number',
    //   city: 'City',
    //   state: 'State',
    //   zipCode: 'Zip Code',
    //   phoneNumber: 'Phone Number'
    // }
    if (!userToRender) {
      return null;
    }
    return (    
      <div>
        <h2>User Account</h2>
        <form>
          <TextField
              name="firstName"
              floatingLabelText="First Name"
              value={ firstName }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.firstNameError}
            />
            <br />
            <TextField
              name="lastName"
              floatingLabelText="Last Name"
              value={ lastName }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.lastNameError}
            />
            <br />
            <TextField
              name="email"
              floatingLabelText="Email"
              value={ email }
              readOnly={updating ? false : true}
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
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              type="password"
              errorText={this.state.passwordError}
            />
            <br />
            <TextField
              name="address1"
              floatingLabelText="Address 1"
              value={ address1 }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.address1Error}
            />
            <br />
            <TextField
              name="address2"
              floatingLabelText="Address 2"
              value={ address2 }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.address2Error}
            />
            <br />
            <TextField
              name="city"
              floatingLabelText="City"
              value={ city }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.cityError}
            />
            <br />
            <TextField
              name="state"
              floatingLabelText="State"
              value={ state }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.stateError}
            />
            <br />
            <TextField
              name="zipCode"
              floatingLabelText="Zip Code"
              value={ zipCode }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.zipCodeError}
            />
            <br />
            <TextField
              name="phoneNumber"
              floatingLabelText="Phone Number"
              value={ phoneNumber }
              readOnly={updating ? false : true}
              onChange={ onChange }
              floatingLabelFixed={true}
              errorText={this.state.phoneNumberError}
            />
            <br />    
          {/* {
            Object.keys(inputs).map(input => {
              return (
                <div key={input}>
                <br />
                <TextField
                name={input}
                floatingLabelText={inputs[input]}
                readOnly={updating ? false : true}
                onChange={onChange}
                value={this.state[input]}
                floatingLabelFixed={true}
                />
                </div>
              )
            })
          } */}
          <br />
        </form>
        {
          updating ? (
            <RaisedButton label="Save" onClick={ onUpdate } primary/>
          ) : (
            <RaisedButton label="Edit" onClick={() => this.setState({ updating: true })} />
          )
        }
        <br />
        <br />
        <div>
          <RaisedButton label="Order History" onClick={ onShowPastOrders } secondary={true}/>
          {
            showComponent ? <PastOrders /> : null
          }
        </div>
        <br />
        {
          user.isAdmin ? <AdminUserAccount user={userToRender}/> : ''
        }
      </div>
    )
  }
}

const mapState = ({ user, addresses, users }, { currentUserId }) => {
  const userToRenderId = currentUserId ? currentUserId : user.id; 
  const userAddress = addresses.find(address => userToRenderId === address.userId)
  const userToRender = users.find(user => user.id === userToRenderId)
  return { 
    userToRender,
    userAddress,
    user
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    updateAddress: (address) => dispatch(updateAddress(address)),
    createAddress: (address) => dispatch(createAddress(address)),
    updateNavUser: (user) => dispatch(updateNavUser(user))
  }
}

export default connect(mapState, mapDispatch)(UserForm);