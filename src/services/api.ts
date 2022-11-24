import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://virtserver.swaggerhub.com/JerryBE1709/SysAsses/1.0.0',
});

export default {
  all_users: () =>
    instance({
      method: 'GET',
      url: '/users',
    }),
};
