import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PastOrders extends Component {
  constructor(props) {
    super(props);
    const { ordersByUser, lineItemsByOrder } = props;    
  }

  componentWillReceiveProps(nextProps) {
    const { ordersByUser, lineItemsByOrder } = nextProps;
  }

  render() {
    const { ordersByUser, lineItemsByOrder } = this.props;
    return (
      <div>
        <h2> Past Orders By User </h2>
        {
          ordersByUser.map(order => {
            return (
              <li key={order.id} className='list-group-item'>
                <h4>Order: {order.id}</h4>
                {
                  lineItemsByOrder.map(lineItem => {
                    return (
                      <li key={lineItem.id} className='list-group-item'>
                        <Link to = {`/products/${lineItem.productId}`}>Product Name: {lineItem.name}</Link>
                        <br />
                        Quantity: {lineItem.quantity}
                        <br />
                        Product Price: {lineItem.price}
                        <br />
                        Date Order Created: {lineItem.createdAt}
                      </li>
                    )
                  })
                }
              </li>
            )
          })
        }
      </div>
    )
  }

}

const mapStateToProps = ({ user, orders, lineItems }) => {
  const ordersByUser = orders.filter(order => order.userId === user.id)
  const lineItemsByOrder = lineItems.filter(lineItem => lineItem.userId === user.id)
  return {
    ordersByUser,
    lineItemsByOrder
  }
}

export default connect(mapStateToProps)(PastOrders);