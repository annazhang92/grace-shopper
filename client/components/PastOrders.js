import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../store';

class PastOrders extends Component {
  constructor(props) {
    super(props);
//    const { user, orders } = props;    
  }

  componentDidMount() {
    this.props.getOrders();
  }

  componentWillReceiveProps(nextProps) {
    const { user, orders } = nextProps;
  }

  render() {
    const { user, orders } = this.props;
    const ordersByUser = orders.filter(order => order.userId === user.id);
    return (
      <div>
        <h2> Past Orders By User </h2>
        {
          ordersByUser.map(order => {
            return (
              <div>
              <li key={order.id} className='list-group-item'>
                <h4>Order: {order.id}</h4> 
                {order.lineItems ? order.lineItems : null};               
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

/*const mapStateToProps = ({ user, orders }) => {
  return {
    user,
    orders
  }
}*/

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(null, mapDispatchToProps)(PastOrders);