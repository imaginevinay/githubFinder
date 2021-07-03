import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

axios.interceptors.request.use(req => {
  req.headers.Authorization = `token ${process.env.REACT_APP_GITHUB_SECRET_TOKEN}`;
  return req;
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);