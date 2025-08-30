import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

// Optional: handle 401 globally for auth calls (signIn/signUp)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(err);
  }
);

export const signIn = (data) => API.post("/auth/signin", data);
export const signUp = (data) => API.post("/auth/signup", data);

export default API;
