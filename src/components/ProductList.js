import React from 'react';
import { formatCurrency } from '../utils';
import { useAuth0 } from '@auth0/auth0-react';

function ProductList({ products, onDelete, onEdit }) {
  const { isAuthenticated, user } = useAuth0();

  const isProductsValid = Array.isArray(products) && products.length > 0;
  
  const canEditOrDelete = (product) => {
    if (!isAuthenticated) return false;
    const appMetadataKey = 'https://localhost:5000/app_metadata'; 
    const isAdmin = user && user[appMetadataKey];
    return user.sub === product.user_id || isAdmin;
  };

  return (
    <section className="items">
      <h2>Produtos:</h2>
      <div className="allProductsBox">
        {!isProductsValid ? (
          <p>Sem produtos disponíveis, experimente adicionar um.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="individualProductBox">
              <div className="productImage">
                <img src="../../placeholderimage.jpg" alt="product" className="productImage" />
                {canEditOrDelete(product) && (
                  <>
                    <button className="deleteButton" onClick={() => onDelete(product.id)}>
                      <img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15" height="15" alt="delete" />
                    </button>
                    <button className="editButton" onClick={() => onEdit(product)}>
                      <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" width="15" height="15" alt="edit" />
                    </button>
                  </>
                )}
              </div>
              <div className="productName">
                <h2>{product.name}</h2>
              </div>
              <div className="productAdditionalInformation">
                <div className="productPrice">
                  <h2>Preço: {formatCurrency(product.price)}</h2>
                </div>
                <div className="productQuantity">
                  <h2>Quantidade: {product.quantity}</h2>
                </div>
                <div className="productDescription">
                  <h2>Descrição: {product.description}</h2>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ProductList;