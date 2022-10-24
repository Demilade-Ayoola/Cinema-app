import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux"
import userSlice from "./redux/number"

let store = configureStore({
    reducer :{number:userSlice}
  })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

