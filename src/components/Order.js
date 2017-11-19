import React, { Component } from 'react';
import LineItem from './LineItem';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      item: '',
      products: [],
      items: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const {products, line_items} = this.props;
    if (line_items !== nextProps.line_items) {
      nextProps.line_items.forEach((item)=> {
        this.Match(item, nextProps.products)
      })
    }
    
    
   
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log()
  //   const diffLine_items = this.props.line_items !== nextProps.line_items
  //   return diffLine_items
  // }
  Match(item, products) {
    products.find((product) => {
      if (product.id === item.data.product_id) {
        let line_items = []
        line_items.push(item)
        this.setState({
          product: product,
          item: item,
          products: products,
          items: line_items
        })
      }
    })
  }
  renderLineItem() {
    const {product, item, products, items} = this.state;
    if (product !== '' && item !== '') {
        return (<LineItem item={item} product={product} />)
      
    }
  }
  render() {
    
    return (

      <table className="order_table">
        <thead>
          <tr>
            <th className="order_header">
              Name:
            </th>
            <th className="order_header">
              Amount:
            </th>
            <th className="order_header">
              Price:
            </th>
            <th className="order_header">
              Total:
            </th>
          </tr>
        </thead>
        <tbody>
        {this.renderLineItem()}
      {
        /*// this.props.line_items.map((line_item, i) => {
        this.props.line_items.forEach(() => {
          
        })*/
      }
        </tbody>
      </table>
    );
  }
}

export default Order;