import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AiChat from './pages/AiChat';
import Home from './pages/Home';
import { About, News, Contact } from './pages/Placeholders';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<AiChat />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
