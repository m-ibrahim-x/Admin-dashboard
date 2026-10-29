import api from "./axios";

export const getAllCarts = ()=> api.get('/carts')

export const clearCarts = () => api.delete("/carts/clear");