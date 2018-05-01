import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';
import { Input, Button } from 'mdbreact';

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      id: user.id ? user.id : '',
      firstName: user.id ? user.firstName : '',
      lastName: user.id ? user.lastName : '',
      password: user.id ? user.password : '',
      email: user.id ? user.email : '',
      address1: user.id ? user.address1 : '',
      address2: user.id ? user.address2: '',
      city: user.id ? user.city: '',
      state: user.id ? user.state : '',
      zipCode: user.id ? user.zipCode : '',
      phoneNumber: user.id ? user.phoneNumber : '',
      updating: false 
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //edit mode automatically?
    const { user } = nextProps;
    // if (user.id) {
    //   const { id, firstName, lastName, email, password } = user;
    //   this.setState({ id, firstName, lastName, email, password })
    // }
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateUser } = this.props;
    const newUserInfo = this.state;
    updateUser(newUserInfo);
    this.setState({ updating: false })
  }

  render() {
    const { onChange, onUpdate } = this;
    const { firstName, lastName, email, password, address1, address2, city, state, zipCode, phoneNumber, updating } = this.state;
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Password',
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
            Object.keys(fields).map(field => {
              return (
                <div className="" key={field}>
                <label className="font-weight-bold">{fields[field]}</label>
                <input
                name={field}
                readOnly={updating ? false : true}
                className={`form-control${updating ? `` : `-plaintext` }`}
                onChange={onChange}
                value={this.state[field]}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
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
              <button onClick={() => this.setState({ updating: true })} className='btn btn-primary'>Update</button>
            )
          }
      </div>
    )
  }
}

const mapState = ({ user }) => {
  return { 
    user 
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(update(user)),
  }
}

export default connect(mapState, mapDispatch)(UserForm);
