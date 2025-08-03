export const API_BASES = {
  dms: "https://dispa8ch-backend-s80b.onrender.com",
  auth: "https://auth-service-ic7f.onrender.com",
  order: "https://order-api-d8i5.onrender.com",
  rider: "https://ridar.onrender.com",
};

export const apiRoutes = {
  company: {
    create: `${API_BASES.auth}/auth/register/company`,
    overview: `${API_BASES.dms}/api/companies/overview`,
    fetch: (id: string) => `${API_BASES.dms}/api/companies/${id}`,
    update: (id: string) => `${API_BASES.dms}/api/companies/${id}`,
  },
  user: {
    create: `${API_BASES.auth}/auth/register/company/user`,
    login: `${API_BASES.auth}/auth/login`,
    logout: `${API_BASES.auth}/auth/logout`,
    fetchAll: `${API_BASES.dms}/api/users`,
  },
  order: {
    create: `${API_BASES.order}/api/orders`,
    fetch: (id: string) => `${API_BASES.order}/api/orders/${id}`,
    fetchOrderItems: (id: string) =>
      `${API_BASES.order}/api/orders/${id}/items`,
    updateStatus: (id: string) => `${API_BASES.order}/api/orders/${id}/status`,
    fetchAll: `${API_BASES.order}/api/orders`,
    fetchByParams: (query: string, page: number = 1, limit: number = 20) =>
      `${API_BASES.order}/api/orders?${query}&page=${page}&limit=${limit}`,
    search: (query: string, page: number = 1, limit: number = 20) =>
      `${API_BASES.order}/api/orders/search?q=${query}&page=${page}&limit=${limit}`,
    filter: (status: string, page: number = 1, limit: number = 20) =>
      `${API_BASES.order}/api/orders/filter?status=${status}&page=${page}&limit=${limit}`,
  },
  rider: {
    create: `${API_BASES.rider}/api/riders`,
    fetchByEmail: (email: string) =>
      `${API_BASES.rider}/api/riders/email/${email}`,
    fetchById: (id: string) => `${API_BASES.rider}/api/riders/${id}`,
    update: (id: string) => `${API_BASES.rider}/api/riders/${id}`,
    deleteById: (id: string) => `${API_BASES.rider}/api/riders/${id}`,
    fetchOrders: (page: number = 1, limit: number = 20) =>
      `${API_BASES.rider}/api/orders?page=${page}&limit=${limit}`,
    fetchOrder: (id: string) => `${API_BASES.rider}/api/orders/${id}`,
    fetchOrderItems: (id: string) =>
      `${API_BASES.rider}/api/orders/${id}/items`,
    location: (id: string) => `${API_BASES.rider}/riders/${id}/location`,
  },
};
