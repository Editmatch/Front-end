import React from 'react';
import {  Route, Routes } from 'react-router-dom';

//Componentes | Páginas
import Home from './pages/home/home'; // Importe o componente Home
import ProfileSelection from './pages/auth/profile-selection';
import Login from './pages/auth/Login';
import Projetos from './pages/dashboard/projects';
import Editores from './pages/dashboard/editors';
import Chat from './pages/dashboard/chat';
function Rotas() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile-selection" element={<ProfileSelection />} />
                <Route path="/cadastro" element={<ProfileSelection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/editores" element={<Editores />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
    );
}

export default Rotas;
