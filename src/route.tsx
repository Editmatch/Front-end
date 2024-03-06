import React from 'react';
import {  Route, Routes } from 'react-router-dom';

//Componentes | Páginas
import Home from './pages/home/home'; // Importe o componente Home
import ProfileSelection from './pages/auth/profile-selection';
import Login from './pages/auth/Login';
import Projetos from './pages/auth/dashboard/projects';
import Editores from './pages/auth/dashboard/editors';
import Chat from './pages/auth/dashboard/chat';
import Registro from './pages/auth/register';
import Portfolio from './pages/auth/dashboard/portfolio';

function Rotas() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/selecionar-perfil" element={<ProfileSelection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/editores" element={<Editores />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
    );
}

export default Rotas;
