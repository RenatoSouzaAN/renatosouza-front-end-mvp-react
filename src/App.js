import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import AuthComponent from './components/AuthComponent';
import Callback from './components/Callback';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './api';

function App() {
  const { isAuthenticated, error } = useAuth0();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { getProducts, addProduct, editProduct, deleteProduct } = useApi();

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [getProducts]); 

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 

  const handleAddProduct = async (product) => {
    try {
      await addProduct(product);
      await fetchProducts();
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      await editProduct(currentProduct.id, product);
      await fetchProducts();
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditPopup = (product) => {
    setCurrentProduct(product);
    setShowEditPopup(true);
  };

  return (
    <Router>
      <div className="App">
        <header>
        <div className="title">
          <h1>DMarket</h1>
          </div>
          <div style={{ marginRight: '24px' }}>
            <div className="auth-container">
            <AuthComponent />
            </div>
            {isAuthenticated && (
              <div className="openPopupButtonDiv">
                <button onClick={() => setShowAddPopup(true)} className="openPopupButton">
                  Adicionar Novo Produto
                </button>
              </div>
            )}            
          </div>

        </header>
        <Routes>
          <Route path="/" element={
            <ProductList 
              products={products}
              onDelete={isAuthenticated ? handleDeleteProduct : null}
              onEdit={isAuthenticated ? openEditPopup : null}
            />
          } />
          <Route path="/callback" element={<Callback />} />
        </Routes>
        {showAddPopup && (
          <AddProductForm 
            onSubmit={handleAddProduct}
            onClose={() => setShowAddPopup(false)}
          />
        )}
        {showEditPopup && (
          <EditProductForm 
            product={currentProduct}
            onSubmit={handleEditProduct}
            onClose={() => setShowEditPopup(false)}
          />
        )}
        {error && <div>Auth0 Error: {error.message}</div>}
      </div>
    </Router>
  );
}

export default App;
