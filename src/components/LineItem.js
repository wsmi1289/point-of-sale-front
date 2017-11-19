import React, { Component } from 'react';

class LineItem extends Component {
  

  // componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps) {
  //     const{products, line_item} = nextProps;
  //     console.log("recieved props: ")
  //     console.log(nextProps)
  //     this.Match(products, line_item)
  //   }
  // }


  Currency(num) {
    let floatNum = parseFloat(num);
    let currency = floatNum.toFixed(2)
    return currency
  }
  Total() {
    let price = parseFloat(this.props.product.price),
        amount = parseFloat(this.props.item.data.amount),
        total = this.Currency(price*amount);
    console.log(amount);
    return total;
  }
  // renderLineItem() {
  //   // let price = parseFloat(this.state.product.price),
  //   //     name = this.state.product.price,
  //   //     amount = parseFloat(this.props.line_item.data.amount),
  //   //     total = (price*amount).toFixed(2);

  //   if (this.state.product !== null) {
  //       return (
  //           <tr className="line_item_row">
  //             <td className="line_item_name">
  //               {this.state.product.name}
  //             </td>
  //             <td className="line_item_amount">
  //               {this.props.line_item.data.amount}
  //             </td>
  //             <td className="line_item_price">
  //               ${this.Currency(this.state.product.price)}
  //             </td>
  //             <td className="line_item_total">
  //               ${this.Total()}
  //             </td>
  //           </tr>
  //       )
  //   } else { return null }
  // }
  render() {
    return (
      <tr className="line_item_row" >
        <td className="line_item_name">
          {this.props.product.name}
        </td>
        <td className="line_item_amount">
          {this.props.item.data.amount}
        </td>
        <td className="line_item_price">
                ${this.Currency(this.props.product.price)}
        </td>
        <td className="line_item_total">
          ${this.Total()}
        </td>
      </tr>  
    );
  }
}

export default LineItem;