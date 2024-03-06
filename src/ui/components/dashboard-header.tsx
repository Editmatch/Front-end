import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DashboardHeader() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleLogout = () => {
        sessionStorage.clear();
        handleClose();
    };

    return (
        <div className="row bg-dark p-3">
            <ul className="nav justify-content-center text-white">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/projetos">Projetos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/chat">Conversas</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/editores">Freelancers</Link>
                </li>   
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/perfil">Perfil</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="#" onClick={handleShow}>Desconectar</Link>
                </li>
            </ul>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Desconectar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja desconectar?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Desconectar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DashboardHeader;
