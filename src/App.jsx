import React, { useState } from 'react';

    function App() {
      const [products, setProducts] = useState([]);
      const [productName, setProductName] = useState('');
      const [price, setPrice] = useState('');
      const [quantity, setQuantity] = useState('');
      const [unit, setUnit] = useState('Gms');
      const [lowestCostProduct, setLowestCostProduct] = useState(null);

      const addProduct = () => {
        if (!price || !quantity) {
          alert('Please enter both price and quantity.');
          return;
        }

        const priceValue = parseFloat(price);
        const quantityValue = parseInt(quantity, 10);

         if (isNaN(priceValue) || isNaN(quantityValue) || quantityValue === 0) {
          alert('Invalid price or quantity entered.');
          return;
        }

        const newProduct = {
          name: productName || `Product ${products.length + 1}`,
          price: priceValue,
          quantity: quantityValue,
          unit: unit,
          totalPrice: (priceValue / quantityValue).toFixed(2),
        };

        setProducts([...products, newProduct]);
        setProductName('');
        setPrice('');
        setQuantity('');
      };

      const findLowestCostProduct = () => {
        if (products.length === 0) {
          alert('No products added yet.');
          return;
        }

        const lowest = products.reduce((min, p) => (min.totalPrice < p.totalPrice ? min : p));
        setLowestCostProduct(lowest);
      };

      const clearComparison = () => {
        setProducts([]);
        setLowestCostProduct(null);
      };

      return (
        <div className="container">
          <h1>Price Comparison App</h1>
          <div className="input-group">
            <label>Price per item:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div className="input-group">
            <label>Quantity:</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          <div className="input-group">
            <label>Unit:</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="KG">KG</option>
              <option value="Gms">Gms</option>
              <option value="Liter">Liter</option>
            </select>
          </div>
          <div className="input-group">
            <label>Product Name (optional):</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          <button onClick={addProduct}>Add Product</button>

          <div className="product-list">
            <h2>Product List</h2>
            {products.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.unit}</td>
                      <td>{product.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products added yet.</p>
            )}
            <button onClick={findLowestCostProduct}>Find Lowest Cost Product</button>
            <button onClick={clearComparison}>Clear</button>
          </div>

          {lowestCostProduct && (
            <div className="lowest-cost">
              <p>
                Lowest Cost Product: {lowestCostProduct.name} - Total Price: {lowestCostProduct.totalPrice}
              </p>
            </div>
          )}
        </div>
      );
    }

    export default App;
