const products = [];
    let selectedProductIndex = -1;

    function addProduct() {
      const priceInput = document.getElementById('price');
      const quantityInput = document.getElementById('quantity');
      const unitInput = document.getElementById('unit');
      const productNameInput = document.getElementById('productName');
      const productTableBody = document.querySelector('#productTable tbody');
      const noProductsMessage = document.getElementById('noProductsMessage');

      const price = parseFloat(priceInput.value);
      const quantity = parseInt(quantityInput.value);
      const unit = unitInput.value;
      const productName = productNameInput.value || `Product ${products.length + 1}`;

      if (isNaN(price) || isNaN(quantity) || quantity === 0) {
        alert('Invalid price or quantity entered.');
        return;
      }

      const totalPrice = (price / quantity).toFixed(2);

      const newProduct = {
        name: productName,
        price: price,
        quantity: quantity,
        unit: unit,
        totalPrice: totalPrice,
      };

      if (selectedProductIndex > -1) {
        // Update existing product
        products[selectedProductIndex] = newProduct;
        const row = productTableBody.children[selectedProductIndex];
        row.cells[0].textContent = newProduct.name;
        row.cells[1].textContent = `₹${newProduct.price}`;
        row.cells[2].textContent = `${newProduct.quantity} ${newProduct.unit}`;
        row.cells[3].textContent = `₹${newProduct.totalPrice}/${newProduct.unit}`;
        selectedProductIndex = -1;
      } else {
        // Add new product
        products.push(newProduct);

        const newRow = productTableBody.insertRow();
        newRow.insertCell().textContent = newProduct.name;
        newRow.insertCell().textContent = `₹${newProduct.price}`;
        newRow.insertCell().textContent = `${newProduct.quantity} ${newProduct.unit}`;
        newRow.insertCell().textContent = `₹${newProduct.totalPrice}/${newProduct.unit}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-button');
        removeButton.onclick = function() {
          removeProduct(newRow, newProduct);
        };
        newRow.insertCell().appendChild(removeButton);

        newRow.onclick = function() {
          selectProduct(newRow, newProduct);
        };
      }

      priceInput.value = '';
      quantityInput.value = '';
      productNameInput.value = '';

      noProductsMessage.style.display = 'none';

      // Highlight the lowest cost product after adding a new product
      highlightLowestCostProducts();
    }

    function removeProduct(row, product) {
      const productTableBody = document.querySelector('#productTable tbody');
      const index = products.indexOf(product);
      if (index > -1) {
        products.splice(index, 1);
      }
      productTableBody.removeChild(row);
      highlightLowestCostProducts();
      if (products.length === 0) {
        document.getElementById('noProductsMessage').style.display = 'block';
      }
    }

    function selectProduct(row, product) {
      const priceInput = document.getElementById('price');
      const quantityInput = document.getElementById('quantity');
      const unitInput = document.getElementById('unit');
      const productNameInput = document.getElementById('productName');
      selectedProductIndex = products.indexOf(product);

      priceInput.value = product.price;
      quantityInput.value = product.quantity;
      unitInput.value = product.unit;
      productNameInput.value = product.name;
    }

    function highlightLowestCostProducts() {
      const productTableBody = document.querySelector('#productTable tbody');

      if (products.length === 0) {
        return;
      }

      // Remove previous highlighting
      productTableBody.querySelectorAll('tr').forEach(row => {
        row.classList.remove('lowest-cost-row');
      });

      // Find the lowest total price
      let lowestPrice = Infinity;
      for (const product of products) {
        const price = parseFloat(product.totalPrice);
        if (price < lowestPrice) {
          lowestPrice = price;
        }
      }

      // Highlight all products with the lowest price
      products.forEach((product, index) => {
        if (parseFloat(product.totalPrice) === lowestPrice) {
          productTableBody.querySelectorAll('tr')[index].classList.add('lowest-cost-row');
        }
      });
    }

    function clearComparison() {
      const productTableBody = document.querySelector('#productTable tbody');
      const noProductsMessage = document.getElementById('noProductsMessage');

      products.length = 0;
      productTableBody.innerHTML = '';
      noProductsMessage.style.display = products.length === 0 ? 'block' : 'none';
    }