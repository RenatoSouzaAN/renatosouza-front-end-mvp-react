import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import AuthComponent from './components/AuthComponent';
import { getProducts, addProduct, editProduct, deleteProduct } from './api';


function App() {
  const [products, setProducts] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await addProduct(product);
      fetchProducts();
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      await editProduct(currentProduct.id, product);
      fetchProducts();
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditPopup = (product) => {
    setCurrentProduct(product);
    setShowEditPopup(true);
  };

  const login = () => {
    window.location.href = 'http://localhost:5000/login';
  };

  const logout = () => {
    window.location.href = 'http://localhost:5000/logout';
  };

  return (
    <div className="App">
      <header>
        <div className="title">
          <h1>DMarket</h1>
        </div>
        <AuthComponent user={user} login={login} logout={logout} />
        {user && (
          <div className="openPopupButtonDiv">
            <button onClick={() => setShowAddPopup(true)} className="openPopupButton">
              Adicionar Novo Produto
            </button>
          </div>
        )}
      </header>

      {user && (
        <>
          <ProductList 
            products={products} 
            onDelete={handleDeleteProduct}
            onEdit={openEditPopup}
          />

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
        </>
      )}
    </div>
  );
}

export default App;