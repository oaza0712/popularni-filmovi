import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(

  <React.StrictMode>
  
    <App />
  </React.StrictMode>

  //document.getElementById('root')
);
