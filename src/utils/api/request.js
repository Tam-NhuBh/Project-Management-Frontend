import axios from "axios";
// const baseURL = "http://localhost:8080";
const baseURL = "https://project-management-website-for-faculty-backend-3mij.vercel.app";
export const request = axios.create({
  baseURL,
});
