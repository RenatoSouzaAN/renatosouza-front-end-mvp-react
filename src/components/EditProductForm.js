import React, { useState, useEffect } from 'react';
import { formatCurrency, isValidPrice } from '../utils';

function EditProductForm({ product, onSubmit, onClose }) {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setEditedProduct({ ...editedProduct, [name]: formatCurrency(value) });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPrice(editedProduct.price)) {
      alert("Please enter a valid price.");
      return;
    }
    onSubmit({
      ...editedProduct,
      price: parseFloat(editedProduct.price.replace(/[^\d,-]/g, '').replace(',', '.'))
    });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Produto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="editName">Nome:</label>
          <div id="editName">{editedProduct.name}</div><br /><br />
          <label htmlFor="editDescription">Descrição:</label>
          <textarea id="editDescription" name="description" value={editedProduct.description} onChange={handleChange} required rows="4" cols="50"></textarea><br /><br />
          <label htmlFor="editPrice">Preço:</label>
          <input type="text" id="editPrice" name="price" value={editedProduct.price} onChange={handleChange} required placeholder="R$ 0,00" /><br /><br />
          <label htmlFor="editQuantity">Quantidade:</label>
          <input type="number" id="editQuantity" name="quantity" value={editedProduct.quantity} onChange={handleChange} required min="0" /><br /><br />
          <input type="submit" value="Finalizar Edição" />
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;