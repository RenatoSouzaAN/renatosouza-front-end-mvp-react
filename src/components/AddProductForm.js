import React, { useState } from 'react';
import { formatCurrency, isValidPrice } from '../utils';

function AddProductForm({ onSubmit, onClose }) {
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setProduct({ ...product, [name]: formatCurrency(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPrice(product.price)) {
      alert("Please enter a valid price.");
      return;
    }
    onSubmit({
      ...product,
      price: parseFloat(product.price.replace(/[^\d,-]/g, '').replace(',', '.'))
    });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="addName">Nome:</label>
          <input type="text" id="addName" name="name" value={product.name} onChange={handleChange} required /><br /><br />
          <label htmlFor="addDescription">Descrição:</label>
          <textarea id="addDescription" name="description" value={product.description} onChange={handleChange} required rows="4" cols="50"></textarea><br /><br />
          <label htmlFor="addPrice">Preço:</label>
          <input type="text" id="addPrice" name="price" value={product.price} onChange={handleChange} required placeholder="R$ 0,00" /><br /><br />
          <label htmlFor="addQuantity">Quantidade:</label>
          <input type="number" id="addQuantity" name="quantity" value={product.quantity} onChange={handleChange} required min="0" /><br /><br />
          <input type="submit" value="Adicionar Produto" />
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;