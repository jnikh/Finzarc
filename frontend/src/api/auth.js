import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const register = async (userData)=>{
  const response = await axios.post(`${API_URL}/register`,userData);
  console.log(response.data)
  return response.data;
  
}


export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error; 
    }
  };

