import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PastOrders extends Component {
  constructor(props) {
    super(props);
    const { ordersByUser } = props;    
  }

  componentWillReceiveProps(nextProps) {
    const { ordersByUser } = nextProps;
  }

  render() {
    const { ordersByUser } = this.props;
    return (
      <div>
        <h2> Past Orders By User </h2>
        {
          ordersByUser.map(order => {
            return (
              <div>
              <li key={order.id} className='list-group-item'>
                <h4>Order: {order.id}</h4>                
                {
                  order.lineItems.map(lineItem => {
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

const mapStateToProps = ({ user, orders }) => {
  const ordersByUser = orders.filter(order => order.userId === user.id);
  return {
    ordersByUser
  }
}

export default connect(mapStateToProps)(PastOrders);