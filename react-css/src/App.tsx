import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Page components
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Task01 from "./pages/Task01";
import Task02 from "./pages/Task02";
import Task03 from "./pages/Task03";
import Task04 from "./pages/Task04";
import Task05 from "./pages/Task05";
import Task06 from "./pages/Task06";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-01" element={<Task01 />} />
          <Route path="/task-02" element={<Task02 />} />
          <Route path="/task-03" element={<Task03 />} />
          <Route path="/task-04" element={<Task04 />} />
          <Route path="/task-05" element={<Task05 />} />
          <Route path="/task-06" element={<Task06 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
