import api from './axios';


export const getAdminDashboardStats = () => 
  api.get('/orders/admin/dashboard');


export const getAllActiveCarts = () => 
  api.get('/orders/admin/carts');


export const getAllOrders = ( params ={}) => 
  api.get('/orders/admin', { params } );

export const getOrderById = (id) => 
  api.get(`/orders/admin/${id}`);


export const updateOrderStatus = (id, payload) => 
  api.patch(`/orders/admin/${id}/status`, payload);


