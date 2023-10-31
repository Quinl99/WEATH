import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route

import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Home />} /> {/* Use element prop to specify the component */}
          <Route path="/about" element={<About />} /> {/* Use element prop to specify the component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
