import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopBottom extends Component {
  constructor(props) {
    super(props);
    const { revenueByProduct } = props;
    this.bubbleTwo = this.bubbleTwo.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }
  
  bubbleTwo (product1, product2) {
    if (product1.revenue > product2.revenue) {
      product2 = product1;
    }
    return product2;
  }
  
  bubbleSort (productArr) {
    let temp;
    let sorted = true;
    for (let j=0; j<productArr.length-1; j++) {
      if (productArr[j].revenue > productArr[j+1].revenue) {
        sorted = false;
      } 
    }
    if (sorted) {
      return productArr;
    } else {
      for (let i=0; i<productArr.length-1; i++) {
        temp = productArr[i+1];
        productArr[i+1] = this.bubbleTwo(productArr[i], productArr[i+1]); 
        if (productArr[i+1].revenue > temp.revenue) {
          productArr[i] = temp;
        }
  
      }
      productArr = this.bubbleSort(productArr);
    }
    return productArr;
  }

  render() {
    const { bubbleSort } = this;
    const { revenueByProduct } = this.props;
    const sortedProducts = bubbleSort(revenueByProduct);
    const topFive = [ sortedProducts[0], sortedProducts[1], sortedProducts[2], sortedProducts[3], sortedProducts[4] ]
    const lastProduct = revenueByProduct.length-1;
    const bottomFive = [ sortedProducts[lastProduct], sortedProducts[lastProduct-1], sortedProducts[lastProduct-2], sortedProducts[lastProduct-3], sortedProducts[lastProduct-4] ]
    
    console.log(topFive)

    if(!topFive) {
      return null;
    }
    return (
      <div>
        <h2>Top Revenue Grossing Products</h2>
        
        <ul className = 'list-group'>
          {
            topFive.map(product => {
              
              return (
                <li key={product.id} className='list-group-item'>
                  {product.name} {product.revenue}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

/*const mapState = ({ lineItems, products }, {ownprops}) => { 
  let newLineItems = [];
  
  const newLineItemFn = 
    lineItems.forEach(lineItem => {
      const productForLineItem = products.find(product => product.id === lineItem.productId);
      lineItem.price = productForLineItem.price;
      lineItem.name = productForLineItem.name;
      newLineItems = [...newLineItems, lineItem];
    })

  const consolidatedLineItems = newLineItems.reduce((total, item) => {
    if (!total[item.name]) {
      total[item.name] = .025 * item.price * item.quantity
    } else {
      total[item.name] += .025 * item.price * item.quantity
    }
    return total;
  }, {})

  return {
    consolidatedLineItems,
    products
  }

}*/

export default TopBottom;

//export default connect(mapState)(TopBottom);