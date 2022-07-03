import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import store from './components/store';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Products from './components/Products';
import User from './components/User';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>
);


