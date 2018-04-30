import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, { updateOrder } from '../store';


class CheckOut extends Component {
  constructor({ order, id, updateOrder }) {
    super();
    this.state = {
      fullName: '',
      address: '',
      creditCardNumber: ''
    };

    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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

  onClick() {
    this.props.updateOrder(this.props.id, { fullName: this.state.fullName, address: this.state.address, creditCardNumber: this.state.creditCardNumber });
    // this.props.setLineItem()
  }

  render() {
    const { onSave, onChange } = this;
    const { fullName, address, creditCardNumber } = this.state;
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
          <Link to="/complete"><button onClick={ this.onClick }>Complete Order</button></Link>
        </form>

      </div>
    );
  }
}


const mapStateToProps = ({ orders }, { id }) => {
  const order = orders.find(order => order.id === id);
  return {
    order,
    id
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateOrder: (id, order) => dispatch(updateOrder(id, order, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
