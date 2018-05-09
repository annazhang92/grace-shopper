import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { PageHeader, Button, ButtonToolbar } from 'react-bootstrap';
import { updateOrder } from '../store';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    const { orders } = this.props;
    this.state = {
      orders: orders ? orders : []
    };

    this.changeOrderStatus = this.changeOrderStatus.bind(this);
  }

  changeOrderStatus(ev, selectedOrder) {
    // PUT route on order isn't working
    selectedOrder.active = ev.target.value;
    // const updatedOrder = {
    //   id: selectedOrder.id,
    //   active: ev.target.value
    // };
    this.props.updateOrder(selectedOrder);
    console.log(selectedOrder);
  }
  render() {
    const { orders } = this.props;
    const { changeOrderStatus } = this;
    if (orders.length < 1) {
      return <PageHeader>You have no orders!</PageHeader>;
    }
    return (
      <div>
        <PageHeader>All Orders</PageHeader>
        <ul className="list-group">
          {
            orders.map(order => {
              return (
                <div className="wrapper">
                  <ButtonToolbar key={ order.id }>
                    <Button bsStyle="link" to={ `/orders/${order.id}` }>{order.description}</Button>
                    <Button bsStyle="primary" onClick={ ev => changeOrderStatus(ev, order) } value={ !(order.active) }>Toggle Order Status</Button>
                  </ButtonToolbar>
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
