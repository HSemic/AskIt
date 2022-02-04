import axios from 'axios';

// export const apiUrl = 'http://localhost:3001/';
export const apiUrl = 'https://mop-react-backend.herokuapp.com/';

export default axios.create({
  baseURL: apiUrl
  // headers: { Pragma: 'no-cache' }
});
