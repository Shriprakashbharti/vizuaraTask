// [file name]: main.jsx
// [updated file]
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Play from './pages/Play'
import Lab from './pages/Lab'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Features from './pages/Features'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='learn' element={<Learn />} />
          <Route path='play' element={<Play />} />
          <Route path='lab' element={<Lab />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='features' element={<Features />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)