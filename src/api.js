const API_URL = "http://127.0.0.1:5000/products";

const getAccessToken = () => {
  const token = localStorage.getItem('access_token');
  console.log('Retrieved token from localStorage:', token ? 'Token exists' : 'No token');
  return token;
};

const createAuthHeader = () => {
  const token = getAccessToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addProduct = async (product) => {
  console.log('Adding product:', product);
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...createAuthHeader()
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    console.error('Error adding product:', response.status, response.statusText);
    throw new Error("Failed to add product");
  }
  const data = await response.json();
  console.log('Product added successfully:', data);
  return data;
};


export const editProduct = async (productId, product) => {
  console.log('Updating product:', product);
  const response = await fetch(`${API_URL}/${productId}/update`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      ...createAuthHeader()
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    console.error('Error updating product:', response.status, response.statusText);
    throw new Error("Failed to edit product");
  }
  console.log('Product updated successfully');
  return response.json();
};

export const deleteProduct = async (productId) => {
  console.log('Deleting product:', productId);
  const response = await fetch(`${API_URL}/${productId}/delete`, { 
    method: "DELETE",
    headers: createAuthHeader()
  });
  if (!response.ok) {
    console.error('Error deleting product:', response.status, response.statusText);
    throw new Error("Failed to delete product");
  }
  console.log('Product deleted successfully');
  return response.text().then((text) => (text ? JSON.parse(text) : {}));
};