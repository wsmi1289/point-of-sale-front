import React, { Component } from 'react';
import './App.css';
import ProductContainer from './components/ProductContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Products</h1>
        </header>
        <ProductContainer />
      </div>
    );
  }
}

export default App;
