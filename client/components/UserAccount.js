import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateAddress, createAddress, updateNavUser } from '../store';
import AdminUserAccount from './AdminUserAccount';
import PastOrders from './PastOrders';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';




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
      passwordNameError: '',
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
      updating: false,
      value: 0,
      textmask: '(1  )    -    '
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
            <SelectField
              name="state"
              floatingLabelText="State"
              // floatingLabelStyle={textAlign: 'left'}
              value={ this.state.value }
              readOnly={updating ? false : true}
              onChange={ onChange }
              errorText={this.state.stateError}
              floatingLabelFixed={true}
            >
              <MenuItem value={0} primaryText="" />
              <MenuItem value={1} primaryText="Alabama" />
              <MenuItem value={2} primaryText="Alaska" />
              <MenuItem value={3} primaryText="Arizona" />
              <MenuItem value={4} primaryText="Arkansas" />
              <MenuItem value={5} primaryText="California" />
              <MenuItem value={6} primaryText="Colorado" />
              <MenuItem value={7} primaryText="Connecticut" />
              <MenuItem value={8} primaryText="Delaware" />
              <MenuItem value={9} primaryText="Florida" />
              <MenuItem value={10} primaryText="Georgia" />
              <MenuItem value={11} primaryText="Hawaii" />
              <MenuItem value={12} primaryText="Idaho" />
              <MenuItem value={13} primaryText="Illinois" />
              <MenuItem value={14} primaryText="Indiana" />
              <MenuItem value={15} primaryText="Iowa" />
              <MenuItem value={16} primaryText="Kansas" />
              <MenuItem value={17} primaryText="Kentucky" />
              <MenuItem value={18} primaryText="Louisiana" />
              <MenuItem value={19} primaryText="Maine" />
              <MenuItem value={20} primaryText="Maryland" />
              <MenuItem value={21} primaryText="Massachusetts" />
              <MenuItem value={22} primaryText="Michigan" />
              <MenuItem value={23} primaryText="Minnesota" />
              <MenuItem value={24} primaryText="Mississippi" />
              <MenuItem value={25} primaryText="Missouri" />
              <MenuItem value={26} primaryText="Montana" />
              <MenuItem value={27} primaryText="Nebraska" />
              <MenuItem value={28} primaryText="Nevada" />
              <MenuItem value={29} primaryText="New Hampshire" />
              <MenuItem value={30} primaryText="New Jersey" />
              <MenuItem value={31} primaryText="New Mexico" />
              <MenuItem value={32} primaryText="New York" />
              <MenuItem value={33} primaryText="North Carolina" />
              <MenuItem value={34} primaryText="North Dakota" />
              <MenuItem value={35} primaryText="Ohio" />
              <MenuItem value={36} primaryText="Oklahoma" />
              <MenuItem value={37} primaryText="Oregon" />
              <MenuItem value={38} primaryText="Pennsylvania" />
              <MenuItem value={39} primaryText="Rhode Island" />
              <MenuItem value={40} primaryText="South Carolina" />
              <MenuItem value={41} primaryText="South Dakota" />
              <MenuItem value={42} primaryText="Tennessee" />
              <MenuItem value={43} primaryText="Texas" />
              <MenuItem value={44} primaryText="Utah" />
              <MenuItem value={45} primaryText="Vermont" />
              <MenuItem value={46} primaryText="Virginia" />
              <MenuItem value={47} primaryText="Washington" />
              <MenuItem value={48} primaryText="West Virginia" />
              <MenuItem value={49} primaryText="Wisconsin" />
              <MenuItem value={50} primaryText="Wyoming" />              
            </SelectField>
            <br />
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