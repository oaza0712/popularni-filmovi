import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Datatable from "./Components/datatable";
import Home from "./Components/home";
import DownloadFile from "./Components/downloadFile";
import './App.css'
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
     
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="datatable" element={<Datatable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
