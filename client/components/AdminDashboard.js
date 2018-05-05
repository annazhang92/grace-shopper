import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrder } from '../store';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.order ? this.props.order.active : ''
    };

    this.changeOrderStatus = this.changeOrderStatus.bind(this);
  }

  changeOrderStatus(ev, selectedOrder) {
    const updatedOrder = {
      id: selectedOrder.id,
      status: ev.target.value
    };
    this.props.updateOrder(updatedOrder);
  }
  // To-do: build this out in a separate component?
  render() {
    const { orders } = this.props;
    const { changeOrderStatus } = this;
    if (!orders) {
      return null;
    }
    return (
      <div>
        <h2>All Orders</h2>
        <ul className="list-group">
          {
            orders.map(order => {
              return (
                <div>
                  <li key={ order.id } className="list-group-item">
                    <Link to={ `/orders/${order.id}` }>{order.description}</Link>
                  </li>
                  <br />
                  <button bsStyle="primary" onClick={ ev => changeOrderStatus(ev, order) } value={ !order.active }>Toggle Order Status</button>
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ orders }) => {
  return {
    orders
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateOrder: order => dispatch(updateOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
