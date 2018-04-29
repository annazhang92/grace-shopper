import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';


const Cart = ({ products, thisUserProducts, thisUserlineItems }) => {
  const totalPrice = thisUserlineItems.reduce(function (acc, thisUserlineItem) {
    return acc + Number(thisUserlineItem.price)* thisUserlineItem.quantity;
  }, 0);

  return (
    <div>
      <PageHeader>Cart Items</PageHeader>
      {thisUserlineItems && thisUserProducts ? <ProductCard products={ thisUserProducts } lineItems={thisUserlineItems}/> : <h2>Your cart is empty!</h2>}
      <h2>TotalPrice: {totalPrice}</h2>
    </div>
  );
};


const mapStateToProps = ({ lineItems, user, products }) => {
  const thisUserlineItems = lineItems.filter(lineItem => lineItem.userId === user.id);
  const idArr = thisUserlineItems.map(thisUserlineItems => thisUserlineItems.productId);
  const thisUserProducts = products.filter(product => idArr.includes(product.id));
  return {
    thisUserlineItems,
    thisUserProducts
  };
}

export default connect(mapStateToProps)(Cart);