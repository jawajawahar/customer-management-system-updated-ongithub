import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export default api;

export const getCustomers = (page = 0, size = 10) =>
  api.get(`/customers?page=${page}&size=${size}`);

export const getCustomer = (id) => api.get(`/customers/${id}`);

export const createCustomer = (data) => api.post("/customers", data);

export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);

export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export const searchCustomers = (name = "", nic = "", page = 0) =>
  api.get(`/customers/search`, {
    params: {
      name,
      nic,
      page,
      size: 10,
    },
  });

export const addFamilyMember = (customerId, memberId) =>
  api.post(`/customers/${customerId}/family/${memberId}`);

export const removeFamilyMember = (customerId, memberId) =>
  api.delete(`/customers/${customerId}/family/${memberId}`);

export const bulkUpload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/bulk/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const bulkUpdate = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/bulk/update-advanced", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
