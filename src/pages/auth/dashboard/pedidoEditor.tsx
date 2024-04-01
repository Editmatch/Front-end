import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { useParams } from "react-router-dom";
import { Container, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import Header from "../../../ui/components/header";
import DashboardHeader from "../../../ui/components/dashboard-header";

// Estilizando os componentes com Styled Components
const OrderContainer = styled.div`
  margin-top: 20px;
`;

const OrderDetail = styled.div`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

function PedidoEditor() {
    const { apiUrl } = useEnvironment();
    const { id } = useParams();
    const editorId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');
    const [orderData, setOrderData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [newVideoLink, setNewVideoLink] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (token) {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    const response = await axios.get(`${apiUrl}/orders/${id}`, config);
                    setOrderData(response.data);
                    console.log(response.data);
                } else {
                    throw new Error('Token não encontrado na sessionStorage. Faça o login para obter um token válido.');
                }
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiUrl, id, token]);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSaveNewLink = async () => {
        try {
            // Verifique se o novo link não está vazio
            if (!newVideoLink) {
                alert('Por favor, insira o novo link do vídeo editado.');
                return;
            }
    
            // Construa o objeto de configuração com o token de autenticação
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
    
            // Construa o corpo da solicitação com o novo link
            // Faça a solicitação PATCH para o endpoint
            await axios.patch(`${apiUrl}/orders/${id}/finish`,
                null,
                {
                    params: {
                        link: newVideoLink
                    },
                    headers: config.headers
                }
            );
    
            // Fechar o modal após o salvamento bem-sucedido
            setShowModal(false);
    
            // Exibir uma mensagem de sucesso
            alert('Novo link salvo com sucesso!');
        } catch (error) {
            // Lidar com erros
            console.error('Erro ao salvar novo link:', error);
            alert('Ocorreu um erro ao salvar o novo link. Por favor, tente novamente mais tarde.');
        }
    }
    

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro: {error}</div>;
    }

    return (
        <>
            <Header />
            <DashboardHeader />
            <Container>
                <div className="row">
                    <div className="text-center col-md-12 mt-2">
                        <h1>Pedido</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="card">
                        <OrderContainer>
                            {orderData && (
                                <>
                                    <OrderDetail><b>Nome do cliente:</b> {orderData.nome}</OrderDetail>
                                    <OrderDetail><b>Título:</b> {orderData.title}</OrderDetail>
                                    <OrderDetail><b>Descrição:</b> {orderData.desc}</OrderDetail>
                                    <OrderDetail><b>Skills:</b> {orderData.skills}</OrderDetail>
                                    <OrderDetail><b>ID do Pedido:</b> {orderData.orderId}</OrderDetail>
                                    <OrderDetail><b>Link:</b>{" "}<a href={orderData.link} target="_blank" rel="noopener noreferrer">Clique aqui</a>
                                    </OrderDetail>
                                </>
                            )}
                        </OrderContainer>
                        <div className="col-md-12 d-flex justify-content-end mb-2">
                            <Button variant="primary" onClick={handleOpenModal}>Marcar como concluído</Button>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Link do Vídeo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formVideoLink">
                            <Form.Label>Novo Link do Vídeo Editado</Form.Label>
                            <Form.Control type="text" placeholder="Insira o novo link do vídeo editado" onChange={(e) => setNewVideoLink(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveNewLink}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PedidoEditor;
