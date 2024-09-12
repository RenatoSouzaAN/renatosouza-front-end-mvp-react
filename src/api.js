import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

const API_URL = "http://localhost:5000/products";
const audience = process.env.REACT_APP_API_AUDIENCE;

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getProducts = useCallback(async () => {
    try {
      let headers = {};
      if (isAuthenticated) {
        const token = await getAccessTokenSilently({
          audience: audience,
          scope: "openid profile email",
        });
        headers = { Authorization: `Bearer ${token}` };
      }
  
      const response = await fetch(`${API_URL}`, { headers });
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const addProduct = useCallback(async (product) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Not authenticated');
      }

      const token = await getAccessTokenSilently({
        audience: audience,
        scope: "openid profile email",
      });

      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const editProduct = useCallback(async (id, product) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Not authenticated');
      }

      const token = await getAccessTokenSilently({
        audience: audience,
        scope: "openid profile email",
      });

      const response = await fetch(`${API_URL}/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const deleteProduct = useCallback(async (id) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Not authenticated');
      }

      const token = await getAccessTokenSilently({
        audience: audience,
        scope: "openid profile email",
      });

      const response = await fetch(`${API_URL}/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return { getProducts, addProduct, editProduct, deleteProduct };
};