import axios from "axios";

const API_BASE = 'http://localhost:8080/api/v1/students';

export const getStudents = () => axios.get(API_BASE);
export const getStudent = (id) => axios.get(`${API_BASE}/${id}`);
export const createStudent = (student) => axios.post(API_BASE, student);
export const updateStudent = (id, student) => axios.put(`${API_BASE}/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);