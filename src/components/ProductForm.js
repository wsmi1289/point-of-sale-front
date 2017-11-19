import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.product.name,
      weighed: this.props.product.weighed,
      price: this.props.product.price,
    }
  }

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleBlur = () => {

    const product = {
      name: this.state.name,
      weighed: this.state.weighed,
      price: this.state.price
    }
    axios.put(`http://localhost:3001/products/${this.props.product.id}`, {
      product: product
    })
    .then(response => {
      // console.log(response);
      this.props.updateProduct(response.data);
    })
    .catch(error => console.log(error))
  }

  render() {
    const {name, weighed, price} = this.state;
    return (
      <div className="tile" >
        <form onBlur={this.handleBlur}>
          <input className="input" type="text" name="name" value={name} placeholder="Veggie Name" onChange={this.handleInput}/>
          <input className="input" type="checkbox" name="weighed" value={weighed} onChange={this.handleInput}/>
            <label for="weighed">Check if product is sold by Weight</label>
          <input className="input" type="text" name="price" value={price} placeholder="Price" onChange={this.handleInput}/>
        </form>
      </div>
    );
  }
}

export default ProductForm;
