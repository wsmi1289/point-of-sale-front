import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product.js';
import Order from './Order.js';
import update from 'immutability-helper';
import ProductForm from './ProductForm';

class ProductContainer extends Component {
	constructor(props) {
  	super(props)
  	this.state = {
    	products: [],
      editingProductId: null,
      currentOrder: null,
      line_item: null,
      line_items: 0
  	}

    // this.addNewProduct = this.addNewProduct.bind(this);
	}

	/***********
	*
	***/
	componentDidMount() {
  	axios.get('http://localhost:3001/products')
  		.then(response => {
    		// console.log(response)
    		this.setState({
          products: response.data
        })
  		})
  	.catch(error => console.log(error))
	}

  addNewProduct = () => {
    axios.post('http://localhost:3001/products', {product: 
      {
        name: '',
        weighed: '',
        price: ''
      }
    })
    .then(response => {
      //console.log(response);
      const products = update(this.state.products, {
        $splice: [[0, 0, response.data]]
      })
      // console.log("addNewProduct");
      this.setState({
        products: products,
        editingProductId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  addNewOrder = () => {
    // console.log("new order");
    axios.post('http://localhost:3001/orders')
    .then(response => {
      // console.log("order id: "+response.data.id);
      this.setState({currentOrder: response.data.id})
    })
    .catch(error => console.log(error))
  }

  addLineItem = (response) => {
    // console.log(response.amount)
    const line_item = {
      product_id: response.product.id,
      order_id: this.state.currentOrder,
      amount: response.amount
    }
    axios.post(`http://localhost:3001/orders/${this.state.currentOrder}/line_items`, line_item)

    .then(response => {
      
      // this.state.line_items +=1
      this.setState({
        line_item: response,
        line_items: this.state.line_items++
      } )
      //console.log(response);
    })
    .catch(error => console.log(error))
  }
  updateProduct = (product) => {
    const productIndex = this.state.products.findIndex(x => x.id === product.id);
    const products = update(this.state.products, {
      [productIndex]: { $set: product}
    })
    this.setState({products: products})
  }

  deleteProduct = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
    .then(response => {
      const productIndex = this.state.products.findIndex(x => x.id === id);
      const products = update(this.state.products, {$splice: [[productIndex, 1]]});
      this.setState({products: products});
    })
    .catch(error => console.log(error))
  }

  renderOrder() {
    console.log(this.state.line_item)
    if(this.state.currentOrder !== null){
      return(<Order order={this.state.currentOrder} products={this.state.products} line_items={this.state.line_items} line_item={this.state.line_item}/>)
    }
  }

  render() {

    return (
    	<div>
    		<button className="newProductButton" onClick={this.addNewProduct}>Add Product</button>
        <button className="newOrderButton" 
          onClick={this.addNewOrder}>Start Order</button>
        {this.renderOrder()}
		    {
          
          this.state.products.map((product) => {
            if (this.state.editingProductId === product.id) {
              return(<ProductForm product={product} key={product.id} updateProduct={this.updateProduct} />)
            } else {
  		    	 return (<Product product={product} key={product.id} onDelete={this.deleteProduct} addLineItem= {this.addLineItem} />)
            }
            
		      })
        }

      </div>
    )
  }
}

export default ProductContainer