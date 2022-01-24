import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCrRX9K9fMWeMmc81r6CgwnL6Y_O5Hhr7k',
  authDomain: 'georgehajjar-c12c6.firebaseapp.com',
  projectId: 'georgehajjar-c12c6',
  storageBucket: 'georgehajjar-c12c6.appspot.com',
  messagingSenderId: '1078622997587',
  appId: '1:1078622997587:web:e4455c17f4c0c846a70aa6',
  measurementId: 'G-7CYXSK8KW6',
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
