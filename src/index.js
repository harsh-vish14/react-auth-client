import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/contextUserInfo';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  
  document.getElementById('root')
);