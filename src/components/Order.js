import React, { Component } from 'react';
import LineItem from './LineItem';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      item: '',
    }
    console.log(this.state.line_items)
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    const {products, line_item} = this.props;
    console.log(line_item)
      if (line_item !== nextProps.line_item) {
        this.Match(nextProps.line_item, nextProps.products)
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
        })
      }
    })
  }
  renderLineItem() {
    const {product, item} = this.state;

    if (product !== '' && item !== '') {
      return (<LineItem item={item} product={product} />)
    }
  }
  render() {
    const {product, item} = this.state;
    // let line_items = ;
    // if (this.props.line_items===null) {
    //   line_items = item
    // }

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
      {
        // this.props.line_items.map(line_item => {
         // product !== '' ? <LineItem item={item} product={product} /> : null

        this.renderLineItem()
        // })
      }
        </tbody>
      </table>
    );
  }
}

export default Order;