import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App'; 

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyAaykU2Ty99PM_OZpJv4wRCOtplJL5QH1g",
  authDomain: "healthyminds-45655.firebaseapp.com",
  projectId: "healthyminds-45655",
  storageBucket: "healthyminds-45655.appspot.com",
  messagingSenderId: "60888456273",
  appId: "1:60888456273:web:ef45febe6ecf80358f2c70"
};

const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.render(
  <Router> 
    <App />
  </Router>,
  document.getElementById('root')
);