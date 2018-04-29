import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class CheckOut extends Component {
  constructor({ order }) {
    super();
    this.state = {
      fullName: '',
      address: '',
      creditCardNumber: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    const { fullName, address, creditCardNumber } = this.state;
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const { onSave, onChange } = this;
    const { fullName, address, creditCardNumber } = this.state;
    console.log(this.props.order)
    return (
      <div>
        <h2>Order Summary</h2>
        {this.props.order &&
        <div>
          <p>Price: {this.props.order.price} dollar</p>
          <p>Description: {this.props.order.description}</p>
        </div>}
        <h3>We need more information to complete the order:</h3>
        <form onSubmit={ onSave }>
          <div><p>FullName</p><input name="fullName" value={ fullName } onChange={ onChange } /></div>
          <div><p>Address</p><input name="address" value={ address } onChange={ onChange } /></div>
          <div><p>CreditCardNumber</p><input name="creditCardNumber" value={ creditCardNumber } onChange={ onChange } /></div>
          <button>Complete Order</button>
        </form>

      </div>
    );
  }
}


const mapStateToProps = ({ orders }, { id }) => {
  const order = orders.find(order => order.id === id);
  return {
    order
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
