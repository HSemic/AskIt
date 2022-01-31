import axios from 'axios';

export default axios.create({
  baseURL: 'https://mop-react-backend.herokuapp.com/'
  // headers: { Pragma: 'no-cache' }
});
