// import React from 'react';

// const Product = ({product}) =>
//   <div className="tile" key={product.id}>
//     <h4>{product.name}</h4>
//     <p>{product.price}</p>
//   </div>

// export default Product

import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: this.props.product,
      amount: '',
      //price: this.props.product.price
    }
  }
  CurrencyUnits() {
    const {weighed} = this.props.product;
    const price = parseFloat(this.props.product.price).toFixed(2);
    if (weighed) {
      return <p>${price}/lb</p>
    } else {
      return <p>${price}/Unit</p>
    }
  }

  handleDelete = () => {
    this.props.onDelete(this.props.product.id)
  }

  handleAmountChange = (event) => {
    this.setState({amount: event.target.value})
    
  }

  handleAmountBlur = () => {
    if (this.state.amount !== null) {
      
      this.props.addLineItem(this.state)
    }
    // const line_item = {
    //   product_id: this.state.product.id,
    //   amount: this.state.amount,
    //   order_id: 1
    // }
  //   axios.post(`http://localhost:3001/line_items`, line_item)
  //   .then(response => {
  //     console.log(response);
  //     this.props.addLineItem(this.state)
  //   })
  //   .catch(error => console.log(error))
  }

  render() {
    const {id, name, price, weighed, amount, img} = this.props.product;
    // console.log(name);
    return (
      <div className="tile" key={id}>
        <span className="delete-button" onClick={this.handleDelete}>x</span>
        <h4>{name}</h4>
        <img src={img} />
        {this.CurrencyUnits()}
        <form onBlur={this.handleAmountBlur}>
          <input className='input' type="text"
          name="amount" value={this.state.amount} placeholder='Enter Amount'
          onChange={this.handleAmountChange} />
        </form>
      </div>
    );
  }
}

export default Product;
