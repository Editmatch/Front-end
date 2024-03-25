import React from 'react';
import Home from './pages/home/home';
import Header from './ui/components/header';
import Footer from './ui/components/footer';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './route';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
       <Helmet>
        <title>Editmatch</title>
        <meta name="description" content="Esta é a minha página." />
      </Helmet>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </div>
  );
}

export default App;
