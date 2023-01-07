import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Datatable from "./Components/datatable";
import Home from "./Components/home";
import Login from "./Components/Login";

import DownloadFile from "./Components/downloadFile";
import './App.css'
import { OidcProvider } from '@axa-fr/react-oidc';

const configuration = {
  client_id: 'interactive.public.short',
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.duendesoftware.com',
  service_worker_relative_url:'/OidcServiceWorker.js',
  service_worker_only:true,
};
function App() {
  
  return (
    <OidcProvider configuration={configuration} >
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="datatable" element={<Datatable />} />
          <Route exact path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
    </OidcProvider>
  );
}

export default App;
