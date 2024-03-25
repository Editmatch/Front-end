import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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

function Pedido() {
    const { apiUrl } = useEnvironment();
    const { id } = useParams();
    const editorId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');
    const [orderData, setOrderData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



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
                    console.log(response.data)
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

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro: {error}</div>;
    }


    const handleGetVideo = async () => {
        try {

            if (!token) {
                alert('Token de autenticação não encontrado. Por favor, faça o login.');
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // Inclui o token de autenticação no header
                }
            };

            const response = await axios.patch(`${apiUrl}/orders/${id}/associate-editor/${editorId}`, null, config);

            if (response.status >= 200 && response.status < 300) {
                alert('Novo video vinculado a você, parabens! O vídeo será disponibilizado em breve.');

            } else {
                alert('Ocorreu um erro ao vincular o video. Por favor, tente novamente mais tarde.');
            }

        } catch (error) {
            alert('Ocorreu um erro ao associar o editor. Por favor, tente novamente mais tarde.');
        }
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
                            <button className="btn btn-primary" onClick={handleGetVideo}>Pegar video</button>
                        </div>
                    </div>
                </div>
            </Container>
        </>


    );
}

export default Pedido;
