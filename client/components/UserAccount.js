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
      lastName: userToRender ? userToRender.lastName : '',
      password: userToRender ? userToRender.password : '',
      email: userToRender ? userToRender.email : '',
      isAdmin: userToRender ? userToRender.isAdmin : '',
//      isPrimary: userAddress ? userAddress.isPrimary : '',
      address1: userAddress ? userAddress.address1 : '',
      address2: userAddress ? userAddress.address2 : '',
      city: userAddress ? userAddress.city: '',
      state: userAddress ? userAddress.state : '',
      zipCode: userAddress ? userAddress.zipCode : '',
      phoneNumber: userAddress ? userAddress.phoneNumber : '',
      showComponent: false,
      updating: false 
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onShowPastOrders = this.onShowPastOrders.bind(this);
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

  onShowPastOrders() {
    const { showComponent } = this.state;
    showComponent ? this.setState({ showComponent: false }) : this.setState({ showComponent: true })
  }

  render() {
    const { onChange, onUpdate, onShowPastOrders } = this;
    const { userToRender, user } = this.props;
    const { firstName, lastName, email, password, isPrimary, address1, address2, city, state, zipCode, phoneNumber, showComponent, updating } = this.state;
    const inputs = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
//      isPrimary: 'Primary Address',
      address1: 'Street Address',
      address2: 'Apartment Number',
      city: 'City',
      state: 'State',
      zipCode: 'Zip Code',
      phoneNumber: 'Phone Number'
    }
    if (!userToRender) {
      return null;
    }
    return (    
      <div>
        <h2>User Account</h2>
        <form>
          {
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
          }
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
          <RaisedButton label="Order History" onClick={ onShowPastOrders } primary/>
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