import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

let github_token;
if(process.env.NODE_ENV !== 'production') {
  github_token = process.env.REACT_APP_GITHUB_SECRET_TOKEN
} else {
  github_token = process.env.GITHUB_SECRET_TOKEN
}

axios.interceptors.request.use(req => {
  req.headers.Authorization = `token ${github_token}`;
  return req;
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);