import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PastOrders extends Component {
  constructor(props) {
    super(props);
//    const { user, orders } = props;    
  }

  render() {
    const { user, ordersByUser, lineItemsByUser } = this.props;
    let lineItemsByOrder;
    if (ordersByUser.length === 0) {
      return 'Sorry, you have no past orders.'
    }
    return (
      <div>
        <h4> Past Orders By User </h4>
        {
          ordersByUser.map(order => {
            const lineItemsByOrder = lineItemsByUser.filter(lineItem => lineItem.orderId === order.id);
            return (
              <div>
              <li key={order.id} className='list-group-item'>
                <h4>Order: {order.id}</h4>                                          
                {                    
                  lineItemsByOrder.map(lineItem => {
                    console.log(lineItemsByUser)                    
                    const subtotal = lineItem.price * lineItem.quantity
                    return (
                      <div>
                        <Link to = {`/products/${lineItem.productId}`}>Product Name: {lineItem.name}</Link>
                        <br />
                        Quantity: {lineItem.quantity}
                        <br />
                        Product Price: {lineItem.price}
                        <br />
                        Product Subtotal: {subtotal}
                        <br />
                        Date Order Created: {lineItem.createdAt}
                      </div>
                    )
                  })
                }
              </li>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = ({ user, orders, lineItems }) => {
  const ordersByUser = orders.filter(order => order.userId === user.id);
  const lineItemsByUser = lineItems.filter(lineItem => lineItem.userId === user.id);
  return {
    user,
    orders,
    lineItemsByUser,
    ordersByUser
  }
}

export default connect(mapStateToProps)(PastOrders);