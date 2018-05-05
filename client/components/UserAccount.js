import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateAddress, createAddress, updateNavUser } from '../store';

import AdminUserAccount from './AdminUserAccount'

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { userToRender, userAddress } = props;
    this.state = {
      id: userToRender.id ? userToRender.id : '',
      firstName: userToRender.id ? userToRender.firstName : '',
      lastName: userToRender.id ? userToRender.lastName : '',
      password: userToRender.id ? userToRender.password : '',
      email: userToRender.id ? userToRender.email : '',
      isAdmin: userToRender.id ? userToRender.isAdmin : '',
//      isPrimary: userAddress ? userAddress.isPrimary : '',
      address1: userAddress ? userAddress.address1 : '',
      address2: userAddress ? userAddress.address2 : '',
      city: userAddress ? userAddress.city: '',
      state: userAddress ? userAddress.state : '',
      zipCode: userAddress ? userAddress.zipCode : '',
      phoneNumber: userAddress ? userAddress.phoneNumber : '',
      updating: false 
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
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

  render() {
    const { onChange, onUpdate } = this;
    const { userToRender, user } = this.props;
    const { firstName, lastName, email, password, isPrimary, address1, address2, city, state, zipCode, phoneNumber, updating } = this.state;
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
                <div className="" key={input}>
                <label className="font-weight-bold">{inputs[input]}</label>
                <input
                name={input}
                readOnly={updating ? false : true}
                className={`form-control${updating ? `` : `-plaintext` }`}
                onChange={onChange}
                value={this.state[input]}
                />
                </div>
              )
            })
          }
        </form>
        {
          updating ? (
            <button onClick={ onUpdate } className='btn btn-primary'>Save</button>
          ) : (
            <button onClick={() => this.setState({ updating: true })} className='btn btn-primary'>I want to edit account!</button>
          )
        }
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
