import React from 'react';
import Home from './pages/home/home';
import Header from './ui/components/header';
import Footer from './ui/components/footer';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './route';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </div>
  );
}

export default App;
