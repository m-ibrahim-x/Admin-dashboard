import api from './axios'



// Get Products
export const getProducts = () => api.get('/products');

// Create Product
export const createProduct = (payload) =>
  api.post('/products', payload, {
    headers: {
      'Content-Type': undefined,
    },
  });

// Search Products
export const searchProducts = ({
  search = "",
  category = "",
  subcategory = ""
} = {}) =>
  api.get('/products/search', { 
    params: {
      search,
      category,
      subcategory
    } 
  });

// Get Product By Id
export const getProductById = (id) => api.get(`/products/${id}`);

// Delete Product
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// update Product
export const updateProduct = (id, payload) =>
  api.patch(`/products/update/${id}`, payload, {
    headers: {
      'Content-Type': undefined,
    },
  });