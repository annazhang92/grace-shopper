import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, updateAddress, createUser, createAddress } from '../store';
//import { Input, Button } from 'mdbreact';

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { user, userAddress } = props;
    this.state = {
      id: user.id ? user.id : '',
      firstName: user.id ? user.firstName : '',
      lastName: user.id ? user.lastName : '',
      password: user.id ? user.password : '',
      email: user.id ? user.email : '',
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
    const { user, userAddress } = nextProps;
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { user, updateUser, updateAddress, userAddress } = this.props;
    const { id, firstName, lastName, password, email, address1, address2, city, state, zipCode, phoneNumber } = this.state;
    const userId = id;
    const newUserInfo = { id, firstName, lastName, password, email };
    const newAddressInfo = { id, address1, address2, city, state, zipCode, phoneNumber, userId };
    updateUser(newUserInfo);
    updateAddress(newAddressInfo);
    this.setState({ updating: false });
  }

  render() {
    const { onChange, onUpdate } = this;
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
              <button onClick={() => this.setState({ updating: true })} className='btn btn-primary'>Update Info</button>
            )
          }
      </div>
    )
  }
}

const mapState = ({ user, addresses }) => {
  const userAddress = addresses.find(address => user.id === address.userId && address.isPrimary === true) 
  return { 
    user,
    userAddress
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    updateAddress: (address) => dispatch(updateAddress(address)),
  }
}

export default connect(mapState, mapDispatch)(UserForm);
