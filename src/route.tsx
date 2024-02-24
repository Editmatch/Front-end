import React from 'react';
import {  Route, Routes } from 'react-router-dom';

//Componentes | Páginas
import Home from './pages/home/home'; // Importe o componente Home
import ProfileSelection from './pages/auth/profile-selection';
import Login from './pages/auth/Login';
function Rotas() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile-selection" element={<ProfileSelection />} />
                <Route path="/cadastro" element={<ProfileSelection />} />
                <Route path="/login" element={<Login />} />
            </Routes>
    );
}

export default Rotas;
