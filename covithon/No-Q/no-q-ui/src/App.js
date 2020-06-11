import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ReactNotification from "react-notifications-component";

import NqRoute from "./routes.js";


function App() {
  return (
    
    <BrowserRouter>
      <ReactNotification/>
       <NqRoute />
      <div className="App">
      </div>
    </BrowserRouter>
  );
}

export default App;
